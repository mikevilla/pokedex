# Pokédex

#### by Mike Villa

* * *

###  Pokedex App Functionality
* This app makes use the Pokemon API to make API requests for data.
* The user is able to search for any Pokemon through the search bar or scanning on the index page.
* Selecting a Pokemon Card will take you to the Pokemon's detailed page. Here you will be able to see detailed information on the Pokemon such as height, weight, growth-rate, gender ratio, habitat, capture rate, abilities, egg groups.
* There is also a stats section with hp, attack, defense, special attack, special defense and speed. 
* There is a moves section that shows all of the moves for that pokemon, the user can scroll inside of this box to see all of them.
* An evolution chain is located on the left hand side to see the progression of a certain species. Here you will able to navigate to specific Pokemon in the evolution chain.
* Able to see a history of what has been searched and revisit at anytime via the recently searched list in the search bar and also a list of pokemon avatars on the top right that are shown once they have been visited.
* The search bar has a sorted list of all of the pokemon. At the moment we will support first 807 pokemon since we do not have image information in the api for past 807.
* When you start typing in the search bar the will automatically start filtering the cards underneath. It will also start filtering the dropdown list options.
* Once you select a pokemon it will take  you to that pokemon's details page.
* Note that you will start seeing the list of pokemon that you searched for both in the drop down list and on the top right.
* The dropdown list has a "Recently Searched" divider to separate it from the sorted list group by letter. 
* The top right "Recently Searched" list is in the form of circular avatars. This is maxed at 10. One you reach 10 then there will be a number indicator that shows how many others you searched for.
* On the evolution page you can click on a card in the chain and it will take you to the Pokemon's page.


### Open API

<img src="https://user-images.githubusercontent.com/24237865/83422649-d1b1d980-a464-11ea-8c91-a24fdf89cd6b.png" align="right" width="21%"/>

* This Pokedex app is using the [PokeAPI](https://pokeapi.co/) for consuming Pokemon data.<br>
* PokeAPI provides a full RESTful API linked to an extensive database detailing everything about the Pokémon main game series.
* See docs for more details https://pokeapi.co/docs/v2

### Implementation
* This app was built using the latest React Framework currently 18.2.0
* Store is handled with the latest React-Redux and Redux Toolkit
* Built with TypeScript
* Styling the UI was built using some of the available components in the MUI V5 framework
* This app also has a responsive layout I took advantage of MUI grid, paper, cards, icons, appbar, toolbar to to quickly build the web app  and also have a consistent theme.
* You can resize the window and it will be responsive and usable on tablet and phone.


### Tech stack & Open-source libraries
* React 18.2.0
* React-dom 18.2.0,
* React-redux 8.0.5
* Redux Toolkit 1.9.2
* React-router-dom 6.8.1
* MUI Material UI version v5.11.9 
* Axios 1.3.2

### Design Notes
* Redux is handling state for the recently searched history
* The Pokemon Details page components get their data via props from their parent Pokemon container. We could possibly make use of redux to handle the data storage for an individual pokemon but I chose not to here because 2 different pokemon would not be sharing the same individual info.

### Testing
* More tests will be on the way
* JavaScript Testing Framework is handled with Jest unit tests files located in each component folder file for example Pokemon.test.tsx

* * *

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the Pokedex app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm test`

Launches the test runner in the interactive watch mode.


* * *

### Assumptions

* Im assuming that when a user visits a pokemon page that we count that as a pokemon that the user had interest in searched for. So when a user clicks on a card and it goes to the details page we then add that pokemon will be included in the history data. It will show up in the recently searched for list.

### Known Issues
* Im using svgs on the index page to render the cards. While this is fast there is still a little but of rendering wait time and flashing on the screen.
* On first load these cards also take a bit of time to show.
* In future fixes I would implement lazy loading or add some UI feedback like a progress icon to help with the UI experience.

### Future Considerations and Feature Additions

* Implement Concurrency: To handle multiple requests simultaneously, you can use concurrency techniques like Goroutines (Go) or Threads (Python). This will allow you to provide a fast response time to clients even when the database is being accessed by multiple clients at the same time.
* Cache frequently requested data: To reduce the load on the database and improve performance, you can cache frequently requested data in memory. You can use a caching library like Redis for this.
* Testing: I would test the Pokédex thoroughly to ensure that it works as expected and can handle a high volume of requests.
* Option to search pokemon by name or ID
* Filter pokemons by type
* Pagination
* Lazy Loading
* Filtering
* Responsiveness and Test thoroughly on mobile devices
* API data validation