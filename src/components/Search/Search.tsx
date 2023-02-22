import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useAppSelector } from "../../app/hooks";
import styles from "./Search.module.css";

const Search = (props: any) => {

    const optionsData = useAppSelector(state => state.pokemon.optionsData);
    const historyData = useAppSelector(state => state.pokemon.historyData);
    const { onChange, label } = props
    const recentlySearched: string[] = [];

    return (
        <>
            <Autocomplete
                freeSolo
                id="PokemonSearch"
                disableClearable
                autoSelect
                options={optionsData.map((option: any) => { if (option) { return option.name} else return null })}
                groupBy={(name) => {
                        let header: string = '';
                        if (historyData.find(element => element.name === name)) {
                            if (!recentlySearched.includes(name)) {
                                recentlySearched.push(name);
                            }
                            header = 'Recently Searched'
                        } else {
                            header = name[0].toUpperCase()
                        }
                        return header;
                    }
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        className={styles.searchInput}
                        variant="standard"
                        label={label}
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                        onChange={onChange}
                        onSelect={onChange}
                    />
                )}
            />
        </>
    );
}

export default Search