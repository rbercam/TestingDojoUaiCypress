/// <reference types="Cypress" />

describe("teste calculo numérico", function(){
    
    function somaInteiros (x, y){
        let z = x + y;
        return z;
    }

    it("soma de dois numeros inteiros", function(){
        expect(somaInteiros(5,1)).to.eq(6)
    })
    it("soma de dois numeros inteiros - Error", function(){
        expect(somaInteiros(5,1)).to.eq(7)
    })
})