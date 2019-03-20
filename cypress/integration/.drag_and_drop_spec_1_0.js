/// <reference types="Cypress" />

describe("Testes e2e quebra-cabeça", function(){

    function movePeca(number, x, y){
        cy.get(`[data-cy="${number}"]`)
        .trigger('mousedown', {which:1})
        .trigger('mousemove', {clientX: x, clientY: y})
        .trigger('mouseup', {force: true})
    }

    it("mover peça para um lugar válido - NOVO", function(){
        cy.visit('quebracabeca.html')
        movePeca(1,340,130)
        cy.get('.pieces li').eq(3).find('span').should('not.exist')
        cy.get('.places li').eq(0).find('span').should('have.id', '1' )
    })


    it("mover peça para um lugar válido", function(){
        cy.visit('quebracabeca.html')
        cy.get('[data-cy="1"]')
        .trigger('mousedown', {which:1})
        .trigger('mousemove', {clientX: 340, clientY: 130})
        .trigger('mouseup', {force: true})
        cy.get('.pieces li').eq(3).find('span').should('not.exist')
        cy.get('.places li').eq(0).find('span').should('have.id', '1' )
    })

    it("mover peça para um lugar invalido", function(){
        cy.visit('quebracabeca.html')
        cy.get('[data-cy="1"]')
        .trigger('mousedown', {which:1})
        .trigger('mousemove', {clientX: 0, clientY: 100})
        .trigger('mouseup', {force: true})
        cy.get('.pieces li').eq(3).find('span').should('have.id', '1')
    })

    it("monta quebra cabeça certo", function(){
        cy.visit('quebracabeca.html')
        movePeca(1, 340, 130 )
        movePeca(2, 410, 130)
        movePeca(3, 480, 130)
        movePeca(4, 340, 200)
        movePeca(5, 410, 200)
        movePeca(6, 480, 200)
        movePeca(7, 340, 270)
        movePeca(8, 410, 270)
        movePeca(9, 480, 270)
        cy.get('.notice')
        .should('have.class', 'success')
        .and('have.text', 'Sucesso!')
        cy.screenshot('sucesso')
    })

    it("monta quebra cabeça erro", function(){
        cy.visit('quebracabeca.html')
        movePeca(1, 340, 200 )
        movePeca(2, 410, 130)
        movePeca(3, 480, 130)
        movePeca(4, 340, 130)
        movePeca(5, 410, 200)
        movePeca(6, 480, 200)
        movePeca(7, 340, 270)
        movePeca(8, 410, 270)
        movePeca(9, 480, 270)
        cy.get('.notice')
        .should('have.class', 'error')
        .and('have.text', 'Falhou, tente denovo!')
        cy.screenshot('falha')
    })
})