import { createSlice } from "@reduxjs/toolkit";

type ObjectType = {
    [key: string]:  {
        id: number,
        name: string,
        sprite: string
    }
};


const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
        pokemonData: {} as ObjectType,
        optionsData: [] as any[],
        historyData: [] as any[],
        filterSearch: "" as string
    },
    reducers: {
        setPokemonData(state, action) {
            console.log('Pokemon SET action ', action);
            state.pokemonData = action.payload;
        },
        setOptionsData(state, action) {
            console.log('Options SET action ', action);
            state.optionsData = action.payload;
        },
        updateHistory(state, action) {

            // if pokemon already in the history then no need to add to history list
            if (!state.historyData.find(element => element.name === action.payload.name)) {
                console.log('in SLICE to add new pokemon to the search results ', action.payload);
                state.historyData.push(action.payload);
                state.optionsData.unshift(action.payload);
            }
        },
        updateFilterSearch(state, action) {
            console.log('filterSearch ', action.payload);
            state.filterSearch = action.payload;
        }
    }

})

export const pokemonActions = pokemonSlice.actions;
export default pokemonSlice.reducer