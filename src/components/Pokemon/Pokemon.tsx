import React, {useEffect, useState} from 'react';
import { NavLink, useParams } from 'react-router-dom'
import styles from './Pokemon.module.css'
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { Chip, LinearProgress, Grid, Paper } from '@mui/material';
import { pokemonActions } from "../pokemonSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import Header from "../Header/Header";
import { COLOR_MATCH } from "../../constants/pokemon";
import {isUndefined} from "util";


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
        abilities: any[],
        name: string;
        height: string;
        weight:  string;
        moves: any[];
        stats: any[];
        types: string[];
    }
    const initData: PokemonType = {
        abilities: [],
        name: '',
        height: '',
        weight: '',
        moves: [],
        stats: [],
        types: [],
    }

    type EvolutionChainType = {
        name: string;
    }

    const initEvolutionChain: EvolutionChainType[] = [];

    type SpeciesType = {
        evolution_chain: { url: string }
    }

    const initSpeciesData: SpeciesType = {
        evolution_chain: { url: "" }
    }

    // Pokemon Main Details
    const [pokemonDetails, setPokemonDetails] = useState<PokemonType>(initData);
    const [evolutionChain, setEvolutionChain] = useState(initEvolutionChain);
    const { abilities, moves, name, height, weight, stats, types } = pokemonDetails;


    // Pokemon Species Details
    const [speciesData, setSpeciesData] = useState<SpeciesType>(initSpeciesData);

    type Evolution = {
        id: string | undefined,
        name: string
    }

    // const evolutionList = Array<Evolution>;
    const evolutionList: Evolution[] = []

    // Recursive function to drill down and build out the evolution list,
    // its a small list so decided to do this with recursion can refactor later
    const buildEvolution = (chain: any): any => {


        let url: string = chain.species.url;

        console.log('#### INSIDE OF THE buildEvolution chain ', chain);
        console.log('CURRENT url => ', chain.species);
        const regex = /\/(\d+)\/?/
        const check = url.match(regex) as RegExpMatchArray | undefined;

        console.log('* match * ', check![1] );


        let name: string = chain.species.name;


        let pokemonEvolved: Evolution = {
            id: check![1],
            name: name,
        }

        console.log('AFTER ASSIGNMENT OF CHAIN INFO evolutionChain');
        console.log('pokemonEvolved = ', pokemonEvolved);

        evolutionList.push(pokemonEvolved);
        console.log('evolutionList = ', evolutionList);
        if (chain.evolves_to.length !== 0) {
             buildEvolution(chain.evolves_to[0]);
        }
        console.log('FINAL222 evolutionList = ', evolutionList);
        return evolutionList;

    }

    const showMoves = ((moves: any[])=> {

        console.log('MOVES UNSORTED ', moves);
        moves.sort((a,b) => {

            const nameA = a.move.name;
            const nameB = b.move.name;
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        })

        return (
            <>
                {  moves.map((item)=> {
                    return (
                        <>
                            <Chip label={item.move.name} variant="outlined" color="primary" size="small" />
                        </>

                    )
                } )}
            </>
        )


    })

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
                console.log('AXIOS CALL POKEMON/1 DETAILS ', data)

            })
            .catch((error)=>{
                console.log('ERROR with Pokemon Call does not exist');
                console.log('error = ', error);
                setPokemonDetails(initData);
            })

        // Pokemon Species API
        // For Evolutions Chain
        axios
            .get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
            .then ((response)=>{
                const { data } = response;
                setSpeciesData(data);
                console.log('********* speciesData basically data in the axios call ', speciesData);
                console.log('DATA ', data);

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
                        setEvolutionChain(evolutionList);
                        console.log('evolutionChain =>> ', evolutionChain);


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


    // MIN = Minimum expected value
    // MAX = Maximum expected value
    // Function to normalise the values (MIN / MAX could be integrated)
    const MIN = 0;
    const MAX = 150;
    const normalise = (value: number) => ((value - MIN) * 100) / (MAX - MIN);



    console.log('paramsId = ', pokemonId);
    console.log('params.pokemonId ', params.pokemonId);
    console.log('pokemonData which is testData for now = ', pokemonData);
    console.log('height ', height);
    console.log('weight ', weight);
    console.log('generateMainAssetUrl(paramsId) ', generateMainAssetUrl(pokemonId!));
    console.log('types = ', types);
    //

    console.log ('ENNNNNNDDD pokemonDetails = ', pokemonDetails);
    console.log ('ENNNNNNDDD speciesData = ', speciesData);
    console.log ('ENNNNNNDDD evolutionChain = ', evolutionChain);


    const buildStatsSection = (stats: any[]) => {

        return (
            stats.map((item)=> {
                return (
                    <>
                        <div>{item.stat.name} :  {item.base_stat}</div>
                        <LinearProgress variant="determinate" value={normalise(item.base_stat)} />
                    </>
                )
            })
        )

    }

    const showTypes = (types: any[]) => {

        const typeStyle = {
            marginRight: `15px`
        }

        return (
            types.map((info: any )=> {

                    const { type } = info;
                    const { name } = type;

                    console.log('NAME: ', name)
                    console.log('HERE2 BIXBY colorMatch[name] ', COLOR_MATCH[name]);

                    return (
                        <Chip sx={typeStyle} color={COLOR_MATCH[name]} label={name}></Chip>
                    )
            })
        )

    }

    // build details jsx
    const buildDetails = () => {

        console.log('buildDetails id ');
        return (
            <>
                <Grid container spacing={2}>
                    <Grid container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          xs={12}
                          md={2}
                    >
                        <Paper elevation={6}>

                            <Grid item
                                    xs={12}
                            >
                                ONE
                            </Grid>
                            <Grid item
                                  xs={12}
                            >
                                TWO
                            </Grid>
                            <Grid item
                                  xs={12}
                            >
                                THREE
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          xs={12}
                          md={4}>
                        <Paper elevation={6}>
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                xs={12}>
                                <Paper elevation={1}>
                                    <img className={styles.pokemonDetails} src={generateMainAssetUrl(pokemonId!)}/>
                                </Paper>
                                <Paper >
                                    { showTypes(types) }
                                </Paper>
                            </Grid>
                            <Grid container
                                  direction="row"
                                  justifyContent="center"
                                  alignItems="center"
                                  xs={12}>
                                <Paper elevation={1}>
                                    "It is said that Charizards fire burns hotter if it has experienced harsh battles."
                                </Paper>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid container
                        direction="column"
                        justifyContent="flex-start"
                        alignContent="stretch"
                        alignItems="stretch"
                        xs={12}
                        md={6}>
                        <Paper elevation={6}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="flex-start"
                                xs={6}>
                                <Paper elevation={1}>
                                    <div>Height: { height }</div>
                                    <div>Weight { weight }</div>
                                    <div>Abilities: { abilities.map((item)=>{
                                        return (
                                            <>{item.name}</>
                                        )
                                    })}</div>
                                    <div>Egg Groups</div>
                                    <div>Gender Ratio</div>
                                    <div>Catch Rate</div>
                                    <div>Category</div>

                                </Paper>
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="flex-start"
                                xs={6}>
                                <Paper elevation={1}>
                                    STATS Base Stats where 150 generally the max

                                    { buildStatsSection(stats) }

                                </Paper>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          xs={12}
                          md={12}>
                        <Paper elevation={6}>MOVES
                            { showMoves(moves) }
                        </Paper>
                    </Grid>
                </Grid>

                <div>---------------------------</div>

                <div>Name: {name}</div>
                <div>ID: {pokemonId}</div>
                <div>Abilities: </div>
                <div>Moves: </div>
                <div>Height: {height}</div>
                <div>Weight: {weight}</div>
                <div>---------------------------</div>

            </>
        )

    }

    return (
        <>
            <Header />

            {pokemonDetails === undefined && <CircularProgress/>}
            {pokemonDetails !== undefined && pokemonDetails && buildDetails()}
            {pokemonDetails.name === "" && <div>Pokemon Not Found</div>}


            <div>POKEMON DETAILS PAGE</div>

            <Paper elevation={3} />

            <div>Pokemon ID is = {params.pokemonId}</div>
            <div>
                <NavLink to='/'>Back to Index Page</NavLink>
            </div>
        </>
    );
}


export default Pokemon;