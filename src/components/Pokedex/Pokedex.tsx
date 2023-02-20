import React from 'react';
import {
    CircularProgress,
    Grid,
} from '@mui/material';
import styles from '../Pokedex/Pokedex.module.css'
import { useAppSelector } from '../../app/hooks'
import Header from '../Header/Header'
import PokemonCard from "../PokemonCard/PokemonCard";

const Pokedex: React.FC<{pokemonData: any, optionsData: any}> = (props) => {

    const pokemonData = useAppSelector(state => state.pokemon.pokemonData);
    const filterSearch = useAppSelector(state => state.pokemon.filterSearch);

    return (
        <>
            <Header />

            { pokemonData !== null ? (
            <Grid container spacing={2} className={styles.grid}>
                {
                    Object.keys(pokemonData).map((pokemonId: string)=>{

                        // Use string includes to determine if the search term is included in the current name of the Pokemon
                        return  (
                            pokemonData[pokemonId].name.includes(filterSearch) &&
                            <React.Fragment key={pokemonId}>
                                <Grid item xs={12} sm={6} md={3} lg={3} xl={2} >
                                     <PokemonCard pokemonId={pokemonId}/>
                                </Grid>
                            </React.Fragment>
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