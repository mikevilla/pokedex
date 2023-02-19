import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import App from '../../App';

test('Bio Component', () => {

    render(
        <Provider store={store}>
            <App />
        </Provider>
    );

    const searchTitle = screen.getByText(/Search for Pokemon/i);
    expect(searchTitle).toBeInTheDocument()

});
