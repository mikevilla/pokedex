import {AppBar, Avatar, AvatarGroup, Grid, Toolbar, Tooltip} from "@mui/material";
import styles from "../Pokedex/Pokedex.module.css";
import logo from "../../img/pokemon_logo_small.png";
import SearchIcon from "@mui/icons-material/Search";
import {Typography } from '@mui/material';
import Search from "../Search/Search";
import { NavLink, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {pokemonActions} from "../pokemonSlice";

const Header: React.FC = (props) => {

    const navigate = useNavigate();

    const optionsData = useAppSelector(state => state.pokemon.optionsData);
    const history = useAppSelector(state => state.pokemon.historyData)
    const dispatch = useAppDispatch();

    const handleOnChange = (event: {
        target: { value: string }
    }) => {

        const term = event.target.value.toLowerCase();
        dispatch(pokemonActions.updateFilterSearch(term));

        const findPokemon = optionsData.find(element => element.name === term)

        if (findPokemon) {
            const pokemonSearched = {...findPokemon}
            pokemonSearched.searched = true;
            dispatch(pokemonActions.updateHistory(pokemonSearched));
            navigate(`/pokemon/${findPokemon.id}`)
        }

    }
    return (

        <>
            <AppBar position='static'>
                <Toolbar className={styles.toolbar}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <NavLink to='/'>
                                <img
                                    className={styles.logo}
                                    src={ logo }
                                    alt="Pokemon Logo"
                                />
                            </NavLink>
                        </Grid>
                        <Grid item xs={6}>
                            { optionsData !== null ? (
                                <div className={styles.searchBox}>                                                <SearchIcon className={styles.searchIcon} />
                                    <Search options={optionsData} onChange={handleOnChange} label='Search for Pokemon' />
                                </div>
                            ) : null
                            }
                        </Grid>
                        <Grid item xs={2}>
                            { history.length > 0 && <Typography className={styles.history}>Recently Searched...</Typography> }
                            <AvatarGroup max={10}>
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
        </>
    )


}

export default Header