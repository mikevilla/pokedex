import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useAppSelector } from "../../app/hooks";

const Search = (props: any) => {

    const optionsData = useAppSelector(state => state.pokemon.optionsData);
    const historyData = useAppSelector(state => state.pokemon.historyData);
    const { onChange, label } = props
    const recentlySearched: string[] = [];

    return (
        <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
                freeSolo
                id="PokemonSearch"
                disableClearable
                options={optionsData.map((option: any) => { if (option) { return option.name} })}
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
        </Stack>
    );
}

export default Search