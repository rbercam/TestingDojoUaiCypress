/// <reference types="Cypress" />
describe("Teste Preechimento Formulario", function(){
    let faker = require('faker')
    let moment = require('moment')
    let name = faker.name.findName();
    let email = faker.internet.email().toLowerCase();
    let date  = moment().add(3,'days').format('YYYY-MM-DD')

    beforeEach(function(){
        cy.viewport(900, 725)
        cy.visit('formulario.html')
    })

    it("preenchimento formulario com sucesso", function(){
        cy.get('#complete_name').type(name)
        cy.get('#email').type(email)
        cy.get('#confirm-email').type(email)
        cy.get('#arrival_date').type(date)
        cy.get('[data-cy=period]').select('Tarde')
        cy.get('[data-cy=nights]').clear().type(2)
        cy.get('[data-cy=submit-btn]').click()
    })

    it("nome completo obrigatorio", function(){
        cy.get('#complete_name').type(name).clear()
        cy.get('#alertName').contains('Nome completo deve ser preenchido')
    })

    it("numero de convidados maior que zero", function(){
        cy.get('#complete_name').type(name)
        cy.get('#email').type(email)
        cy.get('#confirm-email').type(email)
        cy.get('#arrival_date').type(date)
        cy.get('[data-cy=period]').select('Tarde')
        cy.get('[data-cy=nights]').clear().type(2)
        cy.get('[data-cy=guests]').clear()
        cy.contains("Deve ter pelo menos um convidado!")
    })
})