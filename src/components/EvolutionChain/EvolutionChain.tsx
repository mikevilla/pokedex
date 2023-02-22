import React from "react";
import {Divider, IconButton, Paper, Tooltip, Typography} from "@mui/material";
import PokemonCard from "../PokemonCard/PokemonCard";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import InfoIcon from "@mui/icons-material/Info";
import styles from "./EvolutionChain.module.css";
import {POKEMON_LIMIT} from "../../constants/pokemon";

type EvolutionChainType = {
    id: string | undefined;
    name: string;
}

const EvolutionChain: React.FC<{evolutionData: EvolutionChainType[]}> =(props)=> {

    const { evolutionData } = props;
    const displayEvolution = [...evolutionData].reverse();

    return (
        <>
            <Typography variant="h6" className={styles.evolutionHeader}>Evolution Chain
                <Tooltip title="Evolution is a key part of the Pokémon games. Evolving Pokémon makes them stronger and often gives them a wider movepool. Several species of Pokémon are only obtainable through evolution.">
                    <IconButton>
                        <InfoIcon />
                    </IconButton>
                </Tooltip>
            </Typography>
            <Paper className={styles.paper} elevation={0}>
                {displayEvolution.map((pokemon)=>{

                    const { id } = pokemon;

                    if (parseInt(id!) > POKEMON_LIMIT) {
                        return null;
                    } else {
                        return (
                            <React.Fragment key={pokemon.id}>
                                <div className={styles.paper}>
                                    <PokemonCard pokemonId={pokemon.id}/>
                                </div>
                                <div className={styles.arrow}>
                                    <KeyboardDoubleArrowUpIcon className={styles.arrowSize}/>
                                </div>
                            </React.Fragment>
                        );
                    }
                }) }
            </Paper>
            <Divider sx={{ borderBottomWidth: 10 }} />
        </>
    );
};

export default EvolutionChain;