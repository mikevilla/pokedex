import React from 'react';
import { render, screen } from '@testing-library/react';
import Bio from '../Bio/Bio'

describe('Bio Section', () => {

    test('renders Bio Component with data', () => {

        const bioData = {
            abilities: [],
            capture_rate: '45',
            egg_groups: [
                {name: 'monster', url: 'https://pokeapi.co/api/v2/egg-group/1/'},
                {name: 'plant', url: 'https://pokeapi.co/api/v2/egg-group/7/'}],
            gender_rate: '1',
            growth_rate: {name: 'medium-slow', url: 'https://pokeapi.co/api/v2/growth-rate/4/'},
            habitat: {name: 'grassland', url: 'https://pokeapi.co/api/v2/pokemon-habitat/3/'},
            height: '10',
            weight: '130'
        }

        const { abilities, capture_rate, egg_groups, gender_rate, growth_rate, habitat, height, weight } = bioData;

        render(
            <Bio
                abilities={abilities}
                capture_rate={capture_rate}
                egg_groups={egg_groups}
                gender_rate={gender_rate}
                height={height}
                weight={weight}
                habitat={habitat}
                growth_rate={growth_rate}
            />    );

        const searchHabitat = screen.getByText(/grassland/i);
        const searchCaptureRate = screen.getByText(/18 %/i);
        expect(searchHabitat).toBeInTheDocument();
        expect(searchCaptureRate).toBeInTheDocument();

    });

})

