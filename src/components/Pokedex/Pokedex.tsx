import React, { useState, useEffect } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import {
    AppBar,
    Avatar,
    AvatarGroup,
    Card,
    CardContent,
    CircularProgress,
    CardMedia,
    Grid,
    Paper,
    Toolbar,
    Tooltip,
} from '@mui/material';
import styles from '../Pokedex/Pokedex.module.css'
import SearchIcon from '@mui/icons-material/Search';
import Search from "../Search/Search";
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import {pokemonActions} from "../pokemonSlice";
import logo from '../../../src/img/pokemon_logo_small.png';
import TextField from '@mui/material/TextField';


const Pokedex: React.FC<{pokemonData: any, optionsData: any}> = (props) => {

    const [filterTerm, setFilterTerm] = useState("");
    const pokemonData = useAppSelector(state => state.pokemon.pokemonData);
    const optionsData = useAppSelector(state => state.pokemon.optionsData);
    const history = useAppSelector(state => state.pokemon.historyData)
    const dispatch = useAppDispatch();

    const handleOnChange = (event: {
            target: { value: string }
        }) => {

        console.log('event ', event.target );
        const term = event.target.value.toLowerCase();
        setFilterTerm(term);
        const findPokemon = optionsData.find(element => element.name === term)
        console.log('findPokemon = ', findPokemon);

        if (findPokemon) {
            const pokemonSearched = {...findPokemon}
            pokemonSearched.searched = true;
            console.log('SELECTED NEW VALUE ADDING SEARCHED ', pokemonSearched);
            dispatch(pokemonActions.updateHistory(pokemonSearched));
        }

    }

    const getPokemonCard = (pokemonId: any) => {

        const {id, name, sprite } = pokemonData[pokemonId];

        const backgroundStyle = {
            backgroundImage: `url(${sprite})`,
            backgroundPosition: `center`,
            backgroundRepeat: `no-repeat`,
            backgroundSize: `3500%`,
            borderRadius: `5px`,
            contentVisibility: `auto`,
            width: `auto`,
            transform: `scale(0.9)`,
            transition: `box-shadow 9s, transform 0.05s`,
            "&:hover": {
                cursor: `pointer`,
                boxShadow: `0 10px 20px rgba(0,0,0,0.15)`,
                transform: `scale(1)`,
        },
        }

        return (
            <Grid item xs={12} sm={3} key={pokemonId}>
                <NavLink className={styles.navLink} to={`/pokemon/${pokemonId}`}>
                     <Paper elevation={12} sx={backgroundStyle}>
                            <div className={styles.blur}>
                                <CardMedia
                                    className={styles.cardMedia}
                                    image={sprite}
                                >
                                </CardMedia>
                                <CardContent className={styles.cardContent}>
                                    <div className={styles.pokemonTagContainer}>
                                        <div className={styles.pokemonId}>#{id}</div>
                                        <div className={styles.pokemonName}>{name.toUpperCase()}</div>
                                    </div>
                                </CardContent>
                            </div>
                     </Paper>
                </NavLink>
            </Grid>
        )
    }

    return (
        <>
            <AppBar position='static'>
                    <Toolbar className={styles.toolbar}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <img
                                    className={styles.logo}
                                    src={ logo }
                                    alt="Pokemon Logo"
                                />                         </Grid>
                            <Grid item xs={6}>
                                { optionsData !== null ? (
                                    <div className={styles.searchBox}>                                                <SearchIcon className={styles.searchIcon} />
                                        <Search options={optionsData} onChange={handleOnChange} label='Search for Pokemon' />
                                    </div>
                                ) : null
                                }
                           </Grid>
                            <Grid item xs={2}>
                                <AvatarGroup max={30}>
                                    {history.map((pokemon)=>{
                                        return (
                                            <Tooltip title={pokemon.name} arrow>
                                                <NavLink to={`/pokemon/${pokemon.id}`}>
                                                    <Avatar alt={`${pokemon.name}`} src={pokemon.sprite} />
                                                </NavLink>
                                            </Tooltip>
                                        )
                                    })}
                                </AvatarGroup>
                            </Grid>
                        </Grid>
                    </Toolbar>
            </AppBar>

            { pokemonData !== null ? (
            <Grid container spacing={2} className={styles.grid}>
                {
                    Object.keys(pokemonData).map((pokemonId: string)=>{

                        // Use string includes to determine if the search term is
                        // included in the current name of the Pokemon
                        return  (
                            pokemonData[pokemonId].name.includes(filterTerm) && getPokemonCard(pokemonId)
                        )
                    })
                }
            </Grid>
            ) : (
                <CircularProgress />
            )}

        </>
    );
}


export default Pokedex;