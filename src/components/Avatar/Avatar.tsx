import React from "react";
import { NavLink } from "react-router-dom";
import {Chip, Divider, Grid, Paper, Typography} from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import styles from "./Avatar.module.css";
import {COLOR_MATCH, IMAGE_SVG_LIMIT, POKEMON_LIMIT} from "../../constants/pokemon";

type FlavorText = {
    flavor_text: string,
    language: {
        name: string,
        url:string
    }
    version:{
        name: string,
        url:string
    }
}

type AvatarType = {
    slot: string,
    type: {
        name: string,
        url: string
    }
}

const Avatar: React.FC<{
    id: string,
    flavor_text_entries: FlavorText[],
    name: string,
    pokemonId: string,
    types: AvatarType[]
    }> = (props) => {

    const { id, flavor_text_entries, name, pokemonId, types } = props;
    const previousId: number = parseInt(pokemonId) - 1;
    const nextId: number = parseInt(pokemonId) + 1;


    const generateMainAssetUrl = (inputId: string | undefined| null) => {

        let url:string = "";

        if (parseInt(inputId!) <= IMAGE_SVG_LIMIT) {
            url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${inputId}.svg`;
        } else if (inputId) {
            url = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${inputId}.png`;
        }

        return url;
    };

    const showTypes = (types: any[]) => {
        return (
            types.map((info: any )=> {
                const { type } = info;
                const { name } = type;
                return (
                    <React.Fragment key={name}>
                        <Chip key={name} className={styles.tag} color={COLOR_MATCH[name]} label={name}></Chip>
                    </React.Fragment>
                );
            })
        );
    };

    return (
        <>
            <Paper elevation={6} style={{margin: '10px'}}>
                <Grid container
                      direction="column"
                      justifyContent="center"
                      alignItems="center">
                    <Paper elevation={0}>
                        <Typography variant="h4" className={styles.pokemonHeader}>
                            <span className={styles.pokemonNumber}>#{id}</span>
                            <span className={styles.pokemonName}>{name}</span>
                        </Typography>
                    </Paper>
                    <Paper elevation={0}>
                        { previousId > 0 && (
                            <NavLink to={`/pokemon/${previousId}`}>
                                <NavigateBeforeIcon className={styles.navigateIcon }/>
                            </NavLink>
                        )}
                        <img alt="Pokemon" className={styles.pokemonDetails} src={generateMainAssetUrl(pokemonId!)}/>
                        { nextId < POKEMON_LIMIT && (
                            <NavLink to={`/pokemon/${nextId}`}>
                                <NavigateNextIcon className={styles.navigateIcon} />
                            </NavLink>
                        )}

                    </Paper>
                    <Paper elevation={0}>
                        <Typography variant="h6">
                            <span className={styles.typesHeader}>Types</span>
                        </Typography>
                        <Divider/>
                        { showTypes(types) }
                    </Paper>
                </Grid>
                <Grid container
                      direction="column"
                      justifyContent="center"
                      alignItems="center">
                    { flavor_text_entries.length > 0 && <Typography align="center" className={styles.flavorText} >"{flavor_text_entries[0].flavor_text}"</Typography> }
                </Grid>
            </Paper>
        </>
    );
};

export default Avatar;