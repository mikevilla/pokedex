import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate, useParams} from 'react-router-dom'
import styles from './Pokemon.module.css'
import { CircularProgress } from '@mui/material';
import FileUploadTwoToneIcon from '@mui/icons-material/FileUploadTwoTone';
import axios from 'axios';
import { Card, CardContent, Chip, LinearProgress, Grid, Paper, Typography } from '@mui/material';
import { pokemonActions } from "../pokemonSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import Header from "../Header/Header";
import {COLOR_MATCH, DECIMETER, HECTOGRAM} from "../../constants/pokemon";
import PokemonCard from "../PokemonCard/PokemonCard";
import { POKEMON_LIMIT } from '../../constants/pokemon'

const Pokemon: React.FC = ()=> {

    const generateMainAssetUrl = (inputId: string | undefined| null) => {

        let url:string = "";

        if (parseInt(inputId!) <= 649) {
            url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${inputId}.svg`
        } else if (inputId) {
            url = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${inputId}.png`
        } else {
            setPokemonDetails(initData);
        }

        return url;
    }

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const pokemonData = useAppSelector(state => state.pokemon.pokemonData);
    const params = useParams();
    let { pokemonId } = params;

    if (parseInt(pokemonId!) > POKEMON_LIMIT) {
        navigate(`/`)

        // for set id to 1 and redirect to inde page to least prevent going out of the range of supported pokemon
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

    const showMoves = ((moves: any[])=> {

        moves.sort((a,b) => {
            const nameA = a.move.name;
            const nameB = b.move.name;
            return nameA <= nameB ? -1 : 1
        })

        return (
            <>
                { moves.map((item)=> {
                    return (
                        <React.Fragment key={item.move.name}>
                            <Chip label={item.move.name} variant="outlined" color="primary" size="small" />
                        </React.Fragment>
                    )
                } )}
            </>
        )


    })

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


    // MIN = Minimum expected value
    // MAX = Maximum expected value
    // Function to normalise the values (MIN / MAX could be integrated)
    const MIN = 0;
    const MAX = 150;
    const normalise = (value: number) => ((value - MIN) * 100) / (MAX - MIN);
    const buildStatsSection = (stats: any[]) => {

        return (
            stats.map((item)=> {
                return (
                    <>
                        <Typography>{item.stat.name} :  {item.base_stat}</Typography>
                        <LinearProgress
                            variant="determinate"
                            value={normalise(item.base_stat)}
                            sx={{
                                "LinearProgressThickness": "20px"
                            }}/>
                    </>
                )
            })
        )

    }

    const showTypes = (types: any[]) => {


        return (
            types.map((info: any )=> {

                    const { type } = info;
                    const { name } = type;
                    return (
                        <React.Fragment key={name}>
                            <Chip key={name} className={styles.tag} color={COLOR_MATCH[name]} label={name}></Chip>
                        </React.Fragment>
                    )
            })
        )

    }



    // build details jsx
    const buildDetails = () => {

        const profileStyles = {
            background: '#5395f1',
        }


        const convertedFeet = (parseInt(height) / DECIMETER);
        const feet = Math.floor(convertedFeet);
        const inches = Math.round((convertedFeet - feet) * 12);

        const displayEvolution = [...evolutionChain].reverse();
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

                                {displayEvolution.map((pokemon)=>{
                                    return (
                                        <>
                                            <Paper elevation={3}>
                                                <PokemonCard pokemonId={pokemon.id}/>
                                            </Paper>
                                            <FileUploadTwoToneIcon fontSize="large" />
                                        </>
                                    )
                                }) }

                        </Paper>
                    </Grid>
                    <Grid item
                          justifyContent="center"
                          alignItems="center"
                          xs={12}
                          md={4}>
                        <Paper elevation={6}>
                            <Grid container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                xs={12}>
                                <Paper elevation={0}>
                                    <Typography variant='h4'>
                                        <span className={styles.pokemonNumber}>#{id}</span>
                                        <span className={styles.pokemonName}>{name.charAt(0).toUpperCase() + name.slice(1)}</span></Typography>
                                </Paper>
                                <Paper elevation={1}>
                                    <img className={styles.pokemonDetails} src={generateMainAssetUrl(pokemonId!)}/>
                                </Paper>
                                <Paper elevation={0}>
                                    { showTypes(types) }
                                </Paper>
                            </Grid>
                            <Grid container
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  xs={12}>
                                    { flavor_text_entries.length > 0 && <Typography align='center' >"{flavor_text_entries[0].flavor_text}"</Typography> }
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item
                        xs={12}
                        md={6}>
                        <Card elevation={1} style={profileStyles} >
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={6}>
                                <CardContent>
                                    <Typography className={styles.profileHeader}>Height:</Typography>
                                    <Typography variant='h6'>{ feet }' { inches }"</Typography>
                                    <Typography className={styles.profileHeader}>Weight:</Typography>
                                    <Typography variant='h6'>{ (parseInt(weight) / HECTOGRAM).toFixed(1) } lbs</Typography>

                                </CardContent>
                            </Grid>
                            <Grid item xs={6}>
                                <CardContent>
                                    <Typography className={styles.profileHeader}>Growth Rate</Typography>
                                    <Typography variant='h6'>{growth_rate.name} </Typography>
                                    <Typography className={styles.profileHeader}>Gender Ratio</Typography>
                                    <Typography variant='h6'>{gender_rate} </Typography>
                                </CardContent>
                            </Grid>
                            <Grid item xs={6}>
                                <CardContent>
                                    { habitat && (
                                        <>
                                            <Typography className={styles.profileHeader}>Habitat</Typography>
                                            <Typography variant='h6'>{habitat.name} </Typography>
                                        </>
                                        )
                                    }
                                    <Typography className={styles.profileHeader}>Capture Rate</Typography>
                                    <Typography variant='h6'>{ Math.round(((parseInt(capture_rate)/255) * 100)) } % </Typography>
                                </CardContent>
                            </Grid>
                            <Grid item xs={6}>
                                <CardContent>
                                    <Typography className={styles.profileHeader}>Abilities: </Typography>

                                    {abilities.map((item)=>{
                                        return (
                                            <>
                                                <Chip className={styles.tag} label={item.ability.name}/>
                                            </>)
                                    }) }
                                    <Typography className={styles.profileHeader}>Egg Groups:</Typography>

                                    {egg_groups.map((item)=>{
                                        return (
                                            <>
                                                <Chip className={styles.tag} label={item.name}/>
                                            </>)
                                    }) }
                                </CardContent>
                            </Grid>
                        </Grid>
                        </Card>
                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="flex-start"
                                xs={12}>
                                <Paper className={styles.statsSection} elevation={1}>
                                    <Typography> STATS Base Stats where 150 generally the max STATS Base Stats where 150 generally the max </Typography>

                                    { buildStatsSection(stats) }

                                </Paper>
                            </Grid>
                    </Grid>
                    <Grid item
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
            </>
        )

    }

    return (
        <>
            <Header />

            {pokemonDetails === undefined && <CircularProgress/>}
            {pokemonDetails !== undefined && pokemonDetails && buildDetails()}
            {pokemonDetails.name === "" && <div>Pokemon Not Found</div>}

        </>
    );
}


export default Pokemon;