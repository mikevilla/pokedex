import React, { useEffect } from 'react';
import Pokedex from "./components/Pokedex/Pokedex";
import Pokemon from "./components/Pokemon/Pokemon";
import { pokemonActions} from "./components/pokemonSlice";
import { useAppDispatch } from './app/hooks'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { POKEMON_LIMIT } from './constants/pokemon'

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

    // This function is in case we need to switch to another source later.
    const generateMainAssetUrl = (inputId: string | undefined | null) => {

        let url:string = "";

        if (parseInt(inputId!) <= 649) {
            url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${inputId}.svg`
        } else {
            url = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${inputId}.png`
        }

        return url;
    }

    useEffect(() => {

        // Please note that at the time of this implementation the the image url to use for the pokemon stops at 649
        // so for the purposes of showing off the app I will limit the call to that. In the future we can find another
        // source or use a different image. This svg seems like the best quality and fastest which is why I choose it.
        const url = `https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_LIMIT}`

        axios
            .get(url)
            .then((response)=>{
                const { data } = response;
                const { results } = data;

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

    const router = createBrowserRouter( [
        { path: '/', element: <Pokedex pokemonData={pokemonData} optionsData={optionsData } />},
        { path: '/pokemon/:pokemonId', element: <Pokemon />},
    ])

    return <RouterProvider router={router}/>
}

export default App;
