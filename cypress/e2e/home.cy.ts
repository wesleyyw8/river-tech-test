describe('Visits the initial project page', () => {
  it('goes to the root url', () => {
    cy.visit('/')
    cy.contains('Trending games');
  })
});

describe('Going to a page that doesnt exist should redirect to the home page', () => {
  it('goes to the root url in case user goes to an url that doesnt exist', () => {
    cy.visit('/abcedfawd');
    cy.contains('Trending games');
  });
});

describe('Home page should only have the trending games', () => {
  it('goes to the root url in case user goes to an url that doesnt exist', () => {
    cy.clearLocalStorage();
    localStorage.clear();
    
    cy.fixture('game.mock-data.json').then((data) => {
      const obj = data[6];
      obj.tag = 'trending';
      cy.intercept('GET', '**game.mock-data.json', {
        statusCode: 200,
        delay: 1000,
        body: [obj]
      }).as('getGames');
    })
    
    cy.visit('/');
    cy.wait('@getGames');
  });
  it('should have something', () => {
    cy.get('.app-card__detail').contains('Dog House');
  })
});
