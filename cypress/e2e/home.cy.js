describe('Página Inicial', () => {
  it('Deve carregar a página inicial com sucesso', () => {
    cy.visit('/'); // Assumindo que sua página inicial está na raiz da URL
    cy.get('body').should('be.visible'); // Verifica se o body está visível
    cy.contains('Catálogo de Barbantes').should('exist'); // Verifica se um texto esperado existe
  });
});