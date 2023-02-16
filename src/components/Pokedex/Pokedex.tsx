import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    CardContent,
    CircularProgress,
    CardMedia,
    Grid,
    Paper, LinearProgress,
} from '@mui/material';
import styles from '../Pokedex/Pokedex.module.css'
import { useAppSelector } from '../../app/hooks'
import Header from '../Header/Header'

const Pokedex: React.FC<{pokemonData: any, optionsData: any}> = (props) => {

    const pokemonData = useAppSelector(state => state.pokemon.pokemonData);
    const filterSearch = useAppSelector(state => state.pokemon.filterSearch);

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
            <Header />

            { pokemonData !== null ? (
            <Grid container spacing={2} className={styles.grid}>
                {
                    Object.keys(pokemonData).map((pokemonId: string)=>{

                        // Use string includes to determine if the search term is included in the current name of the Pokemon
                        return  (
                            pokemonData[pokemonId].name.includes(filterSearch) && getPokemonCard(pokemonId)
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