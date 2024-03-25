Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
 const longText = 'Teste,teste,teste'
    cy.get('#firstName').type('Teste')
    cy.get('#lastName').type('Teste')
    cy.get('#email').type('Teste@teste.com')
    cy.get('#open-text-area').type(longText)
    cy.get('button[type="submit"]').click()
})
