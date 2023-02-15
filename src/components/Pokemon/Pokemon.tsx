import React, {useEffect, useState} from 'react';
import { NavLink, useParams } from 'react-router-dom'
import styles from './Pokemon.module.css'
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { LinearProgress, Paper } from '@mui/material';
import {pokemonActions} from "../pokemonSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";


const Pokemon: React.FC = ()=> {

    const generateMainAssetUrl = (inputId: string | null) => {

        if (inputId && inputId.length === 4) {
            return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${inputId}.png`
        } else if (inputId) {
            let formattedId: string = inputId.padStart(3, '0');
            return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${formattedId}.png`
        } else {
            setPokemonDetails(initData);
        }
    }
    const dispatch = useAppDispatch();
    const optionsData = useAppSelector(state => state.pokemon.optionsData);
    const pokemonData = useAppSelector(state => state.pokemon.pokemonData);


    const params = useParams();
    const { pokemonId } = params;
    type PokemonType = {
        name: string;
        height: string;
        weight:  string;
        types: string[];
    }
    const initData: PokemonType = {
        name: '',
        height: '',
        weight: '',
        types: [],
    }

    type SpeciesType = {
        evolution_chain: { url: string }
    }
    const initSpeciesData: SpeciesType = {
        evolution_chain: { url: "" }
    }


    // Pokemon Main Details
    const [pokemonDetails, setPokemonDetails] = useState<PokemonType>(initData);
    const { name, height, weight, types } = pokemonDetails;

    // Pokemon Species Details
    const [speciesData, setSpeciesData] = useState<SpeciesType>(initSpeciesData);

    type Evolution = {
        name: string
    }

    // const evolutionList = Array<Evolution>;
    const evolutionList: any[] = []

    const buildEvolution = (chain: any): any => {

        let name: string = chain.species.name;
        let pokemonEvolved: Evolution = {
            name: name
        }

        console.log('INSIDE OF evolutionChain');
        console.log('pokemonEvolved = ', pokemonEvolved);

        evolutionList.push(pokemonEvolved);
        console.log('evolutionList = ', evolutionList);
        if (chain.evolves_to.length !== 0) {
             buildEvolution(chain.evolves_to[0]);
        }
        console.log('FINAL222 evolutionList = ', evolutionList);
        return evolutionList;

    }

    // API call to get the Pokemon Details
    useEffect(()=> {

        console.log('');
        console.log('afte axios call FOR POKEMON optionsData ', optionsData);
        console.log('WHAT ABOUT pokemonData ', pokemonData);
        // update history
        if (Object.keys(pokemonData).length !== 0) {

            const findPokemon = pokemonData[pokemonId!]
            console.log('DETAILS PAGE **** findPokemon = ', findPokemon);

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
                console.log('SELECTED NEW VALUE ADDING SEARCHED ', pokemonFound);
                dispatch(pokemonActions.updateHistory(pokemonFound));
            }
        }



        console.log('-----------------------------------------------')
        console.log('USEEFFECT CALLED');
        // Pokemon Details for abilities, moves, species, sprites and types
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then( (response) => {
                const { data } = response;
                setPokemonDetails(data);

            })
            .catch((error)=>{
                console.log('ERROR with Pokemon Call does not exist');
                console.log('error = ', error);
                setPokemonDetails(initData);
            })

        // Pokemon Species API
        axios
            .get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
            .then ((response)=>{
                const { data } = response;
                setSpeciesData(data);
                console.log('speciesData ', speciesData);

                // make call to get the evolution chain
                axios
                    .get(data.evolution_chain.url)
                    .then((response)=> {
                        const { data } = response;
                        const { chain } = data;

                        console.log('FINAL chain ', chain);
                        const evolutionChain = buildEvolution(chain);
                        console.log('** evolutionChain ', evolutionChain);
                        console.log('evolutionList', evolutionList);

                    })
            })
            .then(()=>{
                console.log('AFTER THEN TO GET EVOLUTION CHAIN')
            })
            .catch((error)=>{
                console.log('ERROR with Pokemon SPECIES');
                console.log('error = ', error);
                setSpeciesData(initSpeciesData)
            })



    }, [pokemonId])

    // console.log('paramsId = ', pokemonId);
    // console.log('params.pokemonId ', params.pokemonId);
    // console.log('pokemonData which is testData for now = ', pokemonData);
    // console.log('height ', height);
    // console.log('weight ', weight);
    // console.log('generateMainAssetUrl(paramsId) ', generateMainAssetUrl(pokemonId!));
    // console.log('types = ', types);
    //


    // build details jsx
    const buildDetails = () => {

        console.log('buildDetails id ');
        return (
            <>
                <img className={styles.pokemonDetails} src={generateMainAssetUrl(pokemonId!)}/>
                <div>Name: {name}</div>
                <div>ID: {pokemonId}</div>
                <div>Abilities: </div>
                <div>Moves: </div>
                <div>Height: {height}</div>
                <div>Weight: {weight}</div>
                <div>---------------------------</div>
                <div>Types: </div>
                { types.map((info: any )=> {

                    const { type } = info;
                    const { name } = type;

                    return (
                        <div key={name}>{name}</div>
                    )
                })}
                <div>---------------------------</div>

            </>
        )

    }


    let progress = 50;


    return (
        <>

            {pokemonDetails === undefined && <CircularProgress/>}
            {pokemonDetails !== undefined && pokemonDetails && buildDetails()}
            {pokemonDetails.name === "" && <div>Pokemon Not Found</div>}


            <div>POKEMON DETAILS PAGE</div>

            <LinearProgress variant="determinate" value={progress} />
            <Paper elevation={3} />

            <div>Pokemon ID is = {params.pokemonId}</div>
            <div>
                <NavLink to='/'>Back to Index Page</NavLink>
            </div>
        </>
    );
}


export default Pokemon;