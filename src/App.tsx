import React, { useEffect } from 'react';
import Pokedex from "./components/Pokedex/Pokedex";
import Pokemon from "./components/Pokemon/Pokemon";
import { pokemonActions} from "./components/pokemonSlice";
import { useAppDispatch } from './app/hooks'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import axios from 'axios';



const App = () => {


    type ObjectType = {
        [key: string]:  {
            id: number,
            name: string,
            sprite: string,
            searched: boolean
        }
    };

    const pokemonData: ObjectType = {};
    const optionsData: any[] = [];
    const dispatch = useAppDispatch();

    const generateMainAssetUrl = (inputId: string | null) => {

        if (inputId && inputId.length === 4) {
            return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${inputId}.png`
        } else if (inputId) {
            let formattedId: string = inputId.padStart(3, '0');
            return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${formattedId}.png`
        }
    }

    useEffect(() => {

        let limit: number = 807;
        const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`

        axios
            .get(url)
            .then((response)=>{
                console.log('*** VALUE OF INDEX CALL IS ', response)
                const { data } = response;
                const { results } = data;

                console.log('BEFORE optionsData ', optionsData);

                // build out the new object by looping through api data
                results.forEach((pokemon: any, index: number)=>{
                    let pokemonImageId = (index + 1).toString();
                    const sprite = generateMainAssetUrl(pokemonImageId);

                    pokemonData[index + 1] = {
                        id: index + 1,
                        name: pokemon.name,
                        sprite: sprite!,
                        searched: false
                    };
                    optionsData.push(pokemonData[index + 1]);

                })

                console.log('FINAL pokemonData ', pokemonData);
                console.log('FINAL *** CHECK checkoptionsDataArray, ', optionsData);
                optionsData.sort((a, b) => {
                    const nameA = a.name.toUpperCase();
                    const nameB = b.name.toUpperCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });

                dispatch(pokemonActions.setPokemonData(pokemonData));
                dispatch(pokemonActions.setOptionsData(optionsData));
            })

    }, [pokemonData, optionsData])

    console.log('APP pokemonData ', pokemonData);
    console.log('APP optionsData ', optionsData);

    const router = createBrowserRouter( [
        { path: '/', element: <Pokedex pokemonData={pokemonData} optionsData={optionsData } />},
        { path: '/pokemon/:pokemonId', element: <Pokemon />},
    ])

    return <RouterProvider router={router}/>
}

export default App;
