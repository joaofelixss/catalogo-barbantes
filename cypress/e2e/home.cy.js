describe('Página Inicial', () => {
  it('Deve carregar a página inicial e verificar o destaque dos barbantes', () => {
    cy.visit('/') // Certifique-se de que a baseUrl no cypress.config.ts esteja correta
    cy.get('body').should('be.visible')
    cy.get('body').should('not.be.empty')
    cy.contains('Destaque dos Barbantes').should('exist') // Nova asserção com o texto correto
  })
})