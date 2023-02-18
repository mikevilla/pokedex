import {IconButton, Paper, Tooltip, Typography} from "@mui/material";
import styles from "../Pokemon/Pokemon.module.css";
import React from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import InfoIcon from "@mui/icons-material/Info";

type EvolutionChainType = {
    id: string | undefined;
    name: string;
}

const EvolutionChain: React.FC<{evolutionChain: EvolutionChainType[]}> =(props)=> {

    const { evolutionChain } = props;
    const displayEvolution = [...evolutionChain].reverse();

    return (
        <>
            <Typography variant='h5' className={styles.evolutionHeader}>Evolution Chain
                <Tooltip title="Evolution is a key part of the Pokémon games. Evolving Pokémon makes them stronger and often gives them a wider movepool. Several species of Pokémon are only obtainable through evolution.">
                    <IconButton>
                        <InfoIcon />
                    </IconButton>
                </Tooltip>
            </Typography>
            <Paper className={styles.paper} elevation={0}>
                {displayEvolution.map((pokemon)=>{
                    return (
                        <React.Fragment key={pokemon.id}>
                            <div className={styles.paper}>
                                <PokemonCard pokemonId={pokemon.id}/>
                            </div>
                            <div className={styles.arrow}>
                                <KeyboardDoubleArrowUpIcon className={styles.arrowSize}/>
                            </div>
                        </React.Fragment>
                    )
                }) }
            </Paper>
        </>
    )
}

export default EvolutionChain