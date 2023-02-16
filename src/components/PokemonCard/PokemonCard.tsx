import React from 'react';
import {CardContent, CardMedia, Grid, Paper} from "@mui/material";
import {NavLink} from "react-router-dom";
import styles from "../Pokedex/Pokedex.module.css";
import {useAppSelector} from "../../app/hooks";


const PokemonCard = (props: any) => {

    const pokemonData = useAppSelector(state => state.pokemon.pokemonData);
    const { pokemonId } = props;
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


export default PokemonCard;