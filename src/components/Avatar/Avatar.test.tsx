import React from 'react';
import { render, screen } from '@testing-library/react';
import Avatar from '../Avatar/Avatar';
import { BrowserRouter } from 'react-router-dom';

describe('Avatar Section', () => {

    test('renders Avatar Component with data', () => {

        let sampleFlavorData = [{
            flavor_text: "The plant blooms\nwhen it is\nabsorbing solar\fenergy. It stays\non the move to\nseek sunlight.",
            language:   {name: 'en', url: 'https://pokeapi.co/api/v2/language/9/'},
            version:    {name: 'red', url: 'https://pokeapi.co/api/v2/version/1/'}
        }];

        const speciesData = {
            id: '3',
            flavor_text_entries: sampleFlavorData,
            name: 'venusaur',
            pokemonId: '3',
            types: [
                {
                    slot: '1',
                    type: {name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/'}
                },
                {
                    slot: '2',
                    type : {name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/'}
                }
            ]
        };

        const { id, flavor_text_entries, name, pokemonId, types } = speciesData;

        render(
            <BrowserRouter>
                <Avatar
                    id={id}
                    flavor_text_entries={flavor_text_entries}
                    name={name}
                    pokemonId={pokemonId!}
                    types={types}
                />
            </BrowserRouter>
        );

        const searchPokemonId = screen.getByText(/#3/i);
        const searchName = screen.getByText(/venusaur/i);
        const searchTypesGrass = screen.getByText(/grass/i);
        const searchTypesPoison = screen.getByText(/poison/i);
        const searchFlavorText= screen.getByText(/The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight./i);

        expect(searchPokemonId).toBeInTheDocument();
        expect(searchName).toBeInTheDocument();
        expect(searchTypesGrass).toBeInTheDocument();
        expect(searchTypesPoison).toBeInTheDocument();
        expect(searchFlavorText).toBeInTheDocument();
    });

});

