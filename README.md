# Pokédex

#### by Mike Villa

* * *

###  Pokedex Functionality
* This app makes use the Pokemon API to make API requests for data https://pokeapi.co/docs/v2. 
* Able to search for any Pokemon through the search bar or scanning on the index page
* Able to see a history of what has been searched and revisit at anytime via the recently searched list in the search bar and also a list of pokemon avatars that are shown once they have been visited.
* Able to see details about abilities, moves, species, sprites and types upon searching.
* Able to see other evolutions of Pokemon and be able to navigate to specific Pokemon in the evolution chain.


### Design Notes

* I choose to have components take advantage of using Redux and make state be available directly in the components without 'prop drilling' in case there's a chance later that common data like 'moves' or evolution chain is changed for some reason then the other parts of the page wouldn't have to all re-render. We could easily changed this back to traditional parent child props communication to make more of generic reusable components if need be.

### Technical Notes
* This app was built using the latest React Framework currently 18.2.0
* Store is handled with the latest React-Redux and Redux Toolkit 
* Built with TypeScript 
* Styling the UI was built using some of the available components in the MUI V5 framework

### Testing
* JavaScript Testing Framework is handled with Jest unit tests files located in each component folder file for example Pokemon.test.tsx

* * *

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm test`

Launches the test runner in the interactive watch mode.\


* * *

### Assumptions

* Im assuming that when a user visits a pokemon page that we will count that as a pokemon that the user had interest in and therefore we add it to the history of pokemon's visited and there for searched for. So when a user clicks on a card and it goes to the details page then that pokemon will be included in the history data.


### Future Considerations and Feature Additions

* Implement Concurrency: To handle multiple requests simultaneously, you can use concurrency techniques like Goroutines (Go) or Threads (Python). This will allow you to provide a fast response time to clients even when the database is being accessed by multiple clients at the same time.


* Cache frequently requested data: To reduce the load on the database and improve performance, you can cache frequently requested data in memory. You can use a caching library like Redis for this.


* Test and Deploy: Finally, test the Pokédex thoroughly to ensure that it works as expected and can handle a high volume of requests. Once you are satisfied with the results, you can deploy the Pokédex to a server or a cloud environment.


* These are the basic steps to create a Pokédex in a concurrent environment. You may also want to add additional features like pagination, sorting, and filtering to the API to make it more user-friendly.

* Option to search pokemon by name or ID

* Filter pokemons by type

* Pagination

* Lazy Loading

* Responsiveness and Test thoroughly on mobile devices

* form validation

* API data validation

### Issues to be taken care in future versions
* make redirect more nicely when a user enters in an invalid pokemonID