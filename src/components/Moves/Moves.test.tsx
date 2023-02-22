import React from 'react';
import { render, screen } from '@testing-library/react';
import Moves from '../Moves/Moves';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from "react-redux";
import {store} from "../../app/store";

describe('Moves Section', () => {

    test('renders Moves Component', () => {
        const moves = [
            {   move: {name: "amnesia", url: "https://pokeapi.co/api/v2/move/133/"},
                version_group_details: []},
            {   move: {name:"attract", url : "https://pokeapi.co/api/v2/move/213/"},
                version_group_details: []}];

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Moves movesData={moves}/>
                </BrowserRouter>
            </Provider>
        );

        const searchMoveOne = screen.getByText(/amnesia/i);
        const searchMoveTwo = screen.getByText(/amnesia/i);

        expect(searchMoveOne).toBeInTheDocument();
        expect(searchMoveTwo).toBeInTheDocument();
    });
});

