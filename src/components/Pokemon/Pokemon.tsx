import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import { pokemonActions } from "../pokemonSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CircularProgress } from '@mui/material';
import { Grid } from '@mui/material';
import axios from 'axios';
import Avatar from '../Avatar/Avatar'
import Bio from '../Bio/Bio'
import EvolutionChain from "../EvolutionChain/EvolutionChain";
import Header from '../Header/Header';
import Moves from '../Moves/Moves'
import Stats from '../Stats/Stats'
import {POKEMON_LIMIT} from "../../constants/pokemon";
import styles from './Pokemon.module.css'

const Pokemon: React.FC = ()=> {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const pokemonData = useAppSelector(state => state.pokemon.pokemonData);
    const params = useParams();
    let { pokemonId } = params;

    if (parseInt(pokemonId!) > POKEMON_LIMIT) {
        navigate(`/`)

        // for set id to 1 and redirect to index page to least prevent going out of the range of supported pokemon
        pokemonId = '1'
    }

    type PokemonType = {
        id: string,
        abilities: any[],
        name: string;
        height: string;
        weight:  string;
        moves: any[];
        stats: any[];
        types: string[];
    }
    const initData: PokemonType = {
        id: '',
        abilities: [],
        name: '',
        height: '',
        weight: '',
        moves: [],
        stats: [],
        types: [],
    }

    type EvolutionChainType = {
        id: string | undefined;
        name: string;
    }

    const initEvolutionChain: EvolutionChainType[] = [];


    type SpeciesType = {
        evolution_chain: { url: string },
        capture_rate: string,
        color: {
            name: string,
            url: string
        },
        egg_groups: any[],
        flavor_text_entries: any[],
        habitat: {
            name: string,
            url: string
        },
        growth_rate: {
            name: string,
            url: string
        }
        gender_rate: string
    }

    const initSpeciesData: SpeciesType = {
        evolution_chain: { url: '' },
        capture_rate: '',
        color: { name: '', url:  '' },
        egg_groups: [],
        flavor_text_entries: [],
        habitat: { name: '', url:  '' },
        growth_rate: { name: '', url:  '' },
        gender_rate: ''
    }

    // Pokemon Main Details
    const [pokemonDetails, setPokemonDetails] = useState<PokemonType>(initData);
    const [evolutionChain, setEvolutionChain] = useState(initEvolutionChain);
    const { abilities, height, id, moves, name, stats, types, weight, } = pokemonDetails;

    // Pokemon Species Details
    const [speciesData, setSpeciesData] = useState<SpeciesType>(initSpeciesData);
    const { capture_rate, color, egg_groups, flavor_text_entries, habitat, growth_rate, gender_rate } = speciesData;

    type Evolution = {
        id: string | undefined,
        name: string
    }

    const evolutionList: Evolution[] = []

    // Recursive function to drill down and build out the evolution list,
    // its a small list so decided to do this with recursion can refactor later
    const buildEvolution = (chain: any): any => {


        const url: string = chain.species.url;
        const regex = /\/(\d+)\/?/
        const check = url.match(regex) as RegExpMatchArray | undefined;
        const name: string = chain.species.name;

        const pokemonEvolved: Evolution = {
            id: check![1],
            name: name,
        }

        evolutionList.push(pokemonEvolved);

        if (chain.evolves_to.length !== 0) {
             buildEvolution(chain.evolves_to[0]);
        }
        return evolutionList;
    }


    // API call to get the Pokemon Details
    useEffect(()=> {

        // update history
        if (Object.keys(pokemonData).length !== 0) {

            const findPokemon = pokemonData[pokemonId!]

            type OptionType = {
                    id: number,
                    name: string,
                    sprite: string,
                    searched: boolean
            }

            const pokemonFound: OptionType = {
                searched: true,
                ...findPokemon
            };

            if (findPokemon) {
                pokemonFound.searched = true;
                dispatch(pokemonActions.updateHistory(pokemonFound));
            }
        }

        // Pokemon Details for abilities, moves, species, sprites and types
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then( (response) => {
                const { data } = response;
                setPokemonDetails(data);

            })
            .catch((error)=>{
                setPokemonDetails(initData);
            })

        // Pokemon Species API For Evolutions Chain
        axios
            .get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
            .then ((response)=>{
                const { data } = response;
                setSpeciesData(data);

                // make call to get the evolution chain
                axios
                    .get(data.evolution_chain.url)
                    .then((response)=> {
                        const { data } = response;
                        const { chain } = data;

                        const evolutionChain = buildEvolution(chain);
                        setEvolutionChain(evolutionList);
                    })
            })
            .catch((error)=>{
                setSpeciesData(initSpeciesData)
            })



    }, [pokemonId])

    // build details jsx
    const buildDetails = () => {

        return (
            <>
                <Grid
                    container
                    spacing={3}
                    direction="row"
                    justifyContent="center"
                    className={styles.mainContainer}
                >
                    <Grid item
                          xs={12}
                          md={2}
                          className={styles.evolutionContainer}
                    >
                        <EvolutionChain evolutionChain={evolutionChain}/>
                    </Grid>
                    <Grid item
                          xs={12}
                          md={4}>
                        <Avatar
                            id={id}
                            flavor_text_entries={flavor_text_entries}
                            name={name}
                            pokemonId={pokemonId!}
                            types={types}
                        />
                    </Grid>
                    <Grid item
                        xs={12}
                        md={6}>
                        <Bio
                            abilities={abilities}
                            capture_rate={capture_rate}
                            egg_groups={egg_groups}
                            gender_rate={gender_rate}
                            height={height}
                            weight={weight}
                            habitat={habitat}
                            growth_rate={growth_rate}
                        />
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                             <Stats statsData={stats}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Moves movesData={moves}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        )

    }

    return (
        <React.Fragment>
            <Header />
            {pokemonDetails === undefined && <CircularProgress/>}
            {pokemonDetails !== undefined && pokemonDetails && buildDetails()}
        </React.Fragment>
    );
}

export default Pokemon;