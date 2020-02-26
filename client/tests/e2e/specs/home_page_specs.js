describe('My First Test', function(){
    it('Finds An Element', function(){
        cy.visit('http://localhost:8080/')
        cy.contains('Username')
        cy.contains('Password')
        cy.contains('Inventory')

        cy.get('.username')

        cy.get('.password')
    })
})