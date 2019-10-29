// https://docs.cypress.io/api/introduction/api.html

describe("Go to shop, click product, add it to cart", function () {
    before(function () {
        cy.viewport('macbook-15');
    })
    it("Click on navbar", function () {
        cy.visit('/')
        cy.get('.navbar')
        cy.get('.navbar-menu')
    })
    it("Click on shop button", function () {
        cy.get('.navbar').contains('shop').click()
        cy.url().should('include', '/shop')
    })
    it("Click on a shop item", function () {
        cy.get('.has-ribbon').first().click()
        cy.url().should('include', '/itempage')
    })
    it("Click on add to cart", function () {
        cy.get('.box').find('button').should('have.class', 'is-info').first().click()
        cy.url().should('include', '/itempage')
    })
    it("Go to cart", function () {
        cy.get('.navbar').click('right')
        cy.url().should('include', '/cart')
    })
    it("Check if one item is in the cart", function () {
        cy.url().should('include', '/cart')
        cy.get('.table').find('tr').should('have.length', 5)
    })
})


describe("Go to shop, add to cart directly", function () {
    before(function () {
        cy.viewport('macbook-15');
    })
    it("Click on navbar", function () {
        cy.visit('/')
        cy.get('.navbar')
        cy.get('.navbar-menu')
    })
    it("Click on shop button", function () {
        cy.get('.navbar').contains('shop').click()
        cy.url().should('include', '/shop')
    })

    it("Click on add to cart", function () {
        cy.get('figure').find('.buttonadd').first().click()
    })
    it("Go to cart", function () {
        cy.get('.navbar').click('right')
        cy.url().should('include', '/cart')
    })
    it("Check if one item is in the cart", function () {
        cy.url().should('include', '/cart')
        cy.get('.table').find('tr').should('have.length', 5)
    })
})