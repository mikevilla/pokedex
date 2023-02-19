import React from 'react';
import {CardContent, CardMedia, Grid, Paper} from "@mui/material";
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../app/hooks";
import styles from "./PokemonCard.module.css";


const PokemonCard = (props: any) => {

    const pokemonData = useAppSelector(state => state.pokemon.pokemonData);
    const { pokemonId } = props;
    const {id, name, sprite } = pokemonData[pokemonId];

    // https://mui.com/material-ui/customization/how-to-customize/
    // "The sx prop is the best option for adding style overrides to a single instance of a component"
    // Here we need to have access to the unique sprite value and add it to the background image so Im
    // implementing styles to the paper component this way
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
        <React.Fragment key={pokemonId}>
            <NavLink className={styles.navLink} to={`/pokemon/${pokemonId}`}>
                <Paper elevation={12} sx={backgroundStyle}>
                    <div className={styles.blur}>
                        <CardMedia
                            className={styles.cardMedia}
                            image={sprite}
                            sx={{ backgroundSize: "contain" }}
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
        </React.Fragment >
    )
}

export default PokemonCard;