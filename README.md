# River Tech FE Interview

## Instructions

### Requirements

Create a mini casino website which contains;

* Do not use Angular's `async` pipe  
  **Additionally, I have ensured that you are now unsubscribed from all of them**    
* Home page
  	* Containing a list of all `trending` games  
    **I created a selector for that.**   
* Side menu
  	* Links to `home` and `games`  
    **I would also like to assure you that API calls are being cached, meaning that if a user has already loaded the games on the home page, there is no need to call the API again. Similarly, the same applies to the games detail page.**  
    
* Games page
  - [x] * List of all games  
  - [x]	* Search
    - [x]	* When the user types inside the search field the games list should update in real time with the results  
    **I used a rxjs selector for that**  
    - [x]	* There should be a 500ms delay between the user typing and updating of results  
    **I used the rxjs/operators delay for this one**  
    - [x]	* The URL should contain the `search term` as a query param  
    **I handled that on the subscribeToQueryParams on the games components**  
    - [x] * Drop down filter by provider  
    **I have implemented a selector function named 'selectDistinctProviders' to ensure that the same providers are not displayed repeatedly on the dropdown list**  
      - [x]	* Dropdown should be a multi-select, user must be able to select multiple providers
**To achieve this, I have utilized the <details></details> HTML tag and included additional CSS to ensure that the div is hidden when the mouse is not hovering over it**    
      - [x]	* User should have an option to clear all selected providers  
      **I have a simple button for that**  
      - [x]	* Clicking an already selected provider deselects it  
      **The native <select multiple> was very buggy for this one so I used a div with checkboxes to achieve it**  
      - [x]	* When selecting/deselecting a provider from the list it should be reflected inside the url  
      **I could handle it in the selector side but I'd decided to do it in the component side. there is a function on the games.component that handles it called filterGames**  
      - [ ]	* Provider list should be updated depending on the searched results only
    - [x] * Search and providers filtering should work in conjunction e.g. `http://localhost:4200/games?searchTerm=book&provider=Kalamba%20Games`
      **I have a updateSearchTerm function on the games component to update the querystring parameter whenever the user selects a provider from the dropdownlist or type something on the search text**  
      - [x]  * Refreshing should keep the user's filter / search  
      **Yes, the querystring parameters will handle that!**  
      - [x]  * Clearing the search should not clear the game provider filter and vice versa
      **One has nothing to do with the other !**     
* Game page
  - [x]	* Contains the thumb and a `Play for Fun` button which redirects to the game by using the `startUrl`
  **To improve the looks of the pages, I have incorporated a thumb in all of them. Additionally, I have utilized the <ng-content> feature to add the 'play for fun' button only when the component is used on the details page. This means that all three pages now use the same card component**  
  - [x]	* Use the `Game.slug` for the `URL` param  
  **I could also used the ID. but since the list says to use the slug I did it using the slug.**  
* Last Played Games
  - [x]	* At the bottom for all pages, have a section called `Last Played`  
  **Done with the lastPlayedComponent**  
  - [x]	* Game is considered as `Last Played` when the user has navigated to the Game Page
  - [x]	* Only Show the 5 most recent games  
  **Done with a selector for that**  
  - [x]	* Should not contain duplicate games  
  **It is handled in the reducer side**    
  - [x]	* Should be ordered by last played first
  **The last played will be on the left**    
  - [x]	* Should be persisted even after the user refreshes the browser  
    **I have implemented the use of local storage for this feature. Although session storage could have been used, I chose to use local storage to ensure that the latest search results are saved even if the user closes their browser**    
* Linting
- [x]  * Fix build issue 
- [x]  * Project should pass all lint rules

### Technical Details

* The solution should be built using Angular, SCSS and TypeScript.
* Use Redux; The scaffolding provided already has `ngxs` installed, you may use other libraries if you want.   
**I installed ngxs-effects to handle the effects**  

* Use the data provided inside the scaffolding `game.mock-data.json` (There should be no alterations to the data provided)
* You may use any libraries or plug-ins you wish to fulfill the requirements.  
**I added prettier**  

### Rating

* You may create the solution however you want, these are key things we will look for;
  * All requirements are met
  **done**
  * Best practices  
  **I removed the shared module and integrated its components and services directly into the pages module since all three pages of the application require the same functionality. Furthermore, I reorganized the project structure by placing components that do not connect with the store into the components folder and those that do connect with the store into the containers folder**
  * Code structure, readability and reusability
  * Error handling
  * Performance considerations
  **since im not using the async pipe, im unsubscribing for all subscriptions when the component destroyes. in addition to that, Im caching the http get request** 
  * RxJS operators usage
  **using a lot of it**  
  * Redux State
  **using the ngxs you placed for me in the package.json**  
  * Modelling data with TypeScript
  **I have made the project more object-oriented by introducing the game interface and the game model. This allows for a more structured and organized approach to the implementation of games within the application.**  
  * Polished Design
  * SCSS usage
  **there is plenty of it**  

## Development

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Lint

Run `npm run lint` to lint the project. This will lint both `ts` and `scss` files.

## Development

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Lint

Run `npm run lint` to lint the project. This will lint both `ts` and `scss` files.

### Additional help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
