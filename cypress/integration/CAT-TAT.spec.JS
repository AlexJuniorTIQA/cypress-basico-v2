/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
  beforeEach(function () {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', function () {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios', function () {
    const longText = 'Teste,teste,teste'
    cy.get('#firstName').type('Teste')
    cy.get('#lastName').type('Teste')
    cy.get('#email').type('Teste@teste.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação', function () {
    const longText = 'Teste,teste,teste'
    cy.get('#firstName').type('Teste')
    cy.get('#lastName').type('Teste')
    cy.get('#email').type('Teste@teste,com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('valida campo telefone', function () {
    const longText = 'Teste,teste,teste'
    cy.get('#phone')
      .type('Teste')
      .should('have.value', '')

  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', function () {
    const longText = 'Teste,teste,teste'
    cy.get('#firstName').type('Teste')
    cy.get('#lastName').type('Teste')
    cy.get('#email').type('Teste@teste.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('#phone-checkbox').click()
    cy.get('.button').click()
    cy.get('.error').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulãrio sem preencher os campos', function () {
    const longText = 'Teste,teste,teste'
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')

  })

  it('envia o formulário com sucesso usando comando customizado', function () {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  it('envia o formulário com sucesso usando cy.clock', function () {
    cy.clock()
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
  })

  it('valida contains', function () {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')

  })

  it('seleciona um produto por seu texto', function () {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto por seu value', function () {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto por seu indice', function () {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('seleciona input do tipo radio', function () {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('seleciona input do tipo radio', function () {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function ($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('seleciona input do tipo radio', function () {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })



  it('marca ambos checkboxes, depois desmarca o ultimo', function () {
    cy.get('input[type="checkbox"]')
      .check()
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('usando check e uncheck', function () {
    cy.get('#email-checkbox').check()
    cy.get('#email-checkbox').uncheck()
  })

  it('seleciona um arquivo da pasta fixtures', function () {
    cy.get('#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function ($input) {
        console.log($input)
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop( simula a ação de arrastar o file de uma aba para o input)', function () {
    cy.get('#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(function ($input) {
        console.log($input)
        expect($input[0].files[0].name).to.equal('example.json')
      })

  })


  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function ($input) {
        console.log($input)
        expect($input[0].files[0].name).to.equal('example.json')
      })

  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('Talking About Testing').should('be.visible')
  })

  it('testa a página da política de privacidade de forma independente', function () {
    cy.visit('./src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')
  })

  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function () {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche a area de texto usando o comando invoke', function () {
    const longText = Cypress._.repeat('0123456789', 20)
    cy.get('#open-text-area')
    .invoke('val', longText)
    .should('have.value', longText)
  })
  it.only('faz uma requisição HTTP', function () {
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
    .should(function(response){
      const{status,statusText, body} = response
      expect(status).to.equal(200)
      expect(statusText).to.equal('OK')
      expect(body).to.include('CAC TAT')

    })
})
  it('', function () {

  })
  it('', function () {

  })

  it('', function () {

  })

  it('', function () {

  })

  it('', function () {

  })

})
