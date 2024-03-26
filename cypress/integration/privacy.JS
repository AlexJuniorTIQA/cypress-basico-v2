/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
  beforeEach(function () {
    cy.visit('./src/index.html')
  })  
  it('testa a página da política de privacidade de forma independente', function () {
    cy.visit('./src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')
  })

  Cypress._.times(3,function(){
  it('testa a página da política de privacidade de forma independente 3 VEZES', function () {
    cy.visit('./src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')
  })
})
})
