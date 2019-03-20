/// <reference types="Cypress" />


describe('Drag n Drop - Exemplos', function () {

  describe('Quebra cabeças usando mouse events', function () {

    function movePeca (number, x, y) {
      cy.get(`.piece-${number}`)
      .trigger('mousedown', {
        which: 1,
      })
      .trigger('mousemove', {
        clientX: x,
        clientY: y,
      })
      .trigger('mouseup', {
        force: true,
      })
    }

    function completaQuebraCabeca (correto) {
      movePeca(1, 340, correto ? 130 : 200)
      movePeca(2, 410, 130)
      movePeca(3, 480, 130)
      movePeca(4, 340, correto ? 200 : 130)
      movePeca(5, 410, 200)
      movePeca(6, 480, 200)
      movePeca(7, 340, 270)
      movePeca(8, 410, 270)
      movePeca(9, 480, 270)
    }

    beforeEach(function () {
      cy.viewport(550, 350)
      cy.visit('/quebraCabeca.html')
    })

    it('mover peça e soltar em um lugar válido', function () {
      movePeca(1, 340, 130)
      cy.get('.pieces li').eq(3).find('span').should('not.exist')
      cy.get('.places li').eq(0).find('span').should('have.class', 'piece-1')
    })

    it('mover peça e soltar em um lugar inválido', function () {
      movePeca(1, 0, 0)
      cy.get('.pieces li').eq(3).find('span').should('have.class', 'piece-1')
    })

    it('mover peça e soltar em um lugar válido já ocupado', function () {
      movePeca(1, 340, 130)
      movePeca(2, 340, 130)
      cy.get('.places li').eq(0).find('span').should('have.class', 'piece-1')
      cy.get('.pieces li').eq(7).find('span').should('have.class', 'piece-2')
    })

    it('permitir mover peça para o lugar de origem', function () {
      movePeca(1, 340, 130)
      movePeca(1, 70, 180)
      cy.get('.pieces li').eq(3).find('span').should('have.class', 'piece-1')
    })

    it('exibir mensagem de erro ao completar o quebra cabeças de forma incorreta', function () {
      completaQuebraCabeca(false)
      cy.get('.notice')
      .should('have.class', 'error')
      .and('have.text', 'Falhou, tente denovo!')
    })

    it('exibir mensagem de sucesso ao completar o quebra cabeças corretamente', function () {
      completaQuebraCabeca(true)
      cy.get('.notice')
      .should('have.class', 'success')
      .and('have.text', 'Sucesso!')
    })
  })
})
