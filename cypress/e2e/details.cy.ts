describe('Details page ', () => {
  it('When the user goes to the games page', () => {
    cy.clearLocalStorage();
    localStorage.clear();
    
    cy.fixture('game.mock-data.json').then((data) => {
      cy.intercept('GET', '**game.mock-data.json', {
        statusCode: 200,
        delay: 500,
        body: data
      }).as('getGames');
    })
    
    cy.visit('/games');
    cy.wait('@getGames');
  });
  it('and he clicks on an item', () => {
    cy.get('.app-card__detail').contains('Super Sevens & Fruits: 6 Reels').click();
  })

  it('then the games detail page should load', () => {
    cy.get('.app-games__title').contains('Detail');
  });
  
  it('and the selected game should appear on the footer', () => {
    cy.get('.footer').contains('Super Sevens & Fruits: 6 Reels');
  })

  it('and after the user reload the page', () => {
    cy.reload();
  });

  it('the selected game is still on the footer', () => {
    cy.get('.footer').contains('Super Sevens & Fruits: 6 Reels');
  });
});