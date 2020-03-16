describe('Edit Deals',()=>{
    it('Title of Deal Missing',function (){
        cy.visit('/')

        cy.contains('Log In').click()
        .get('.username').type('admin')
        .get('.password').invoke('show').type('password')
        cy.contains('login').click()

        cy.contains('Edit Deals').click({force:true})

        cy.get('.add-button').click()

        cy.get('.add-title').should('be.visible') 
    })
})

describe('Edit Deals',()=>{
    it('Expiration Date of Deal Missing',function (){
        cy.visit('/')

        cy.contains('Log In').click()
        .get('.username').type('admin')
        .get('.password').invoke('show').type('password')
        cy.contains('login').click()

        cy.contains('Edit Deals').click({force:true})

        cy.get('.add-title').type('New Deal Title')

        cy.get('.add-button').click()

        cy.get('.add-exp').should('be.visible') 
    })
})

describe('Edit Deals',()=>{
    it('Detailed Information of Deal Missing',function (){
        cy.visit('/')

        cy.contains('Log In').click()
        .get('.username').type('admin')
        .get('.password').invoke('show').type('password')
        cy.contains('login').click()

        cy.contains('Edit Deals').click({force:true})

        cy.get('.add-title').type('New Deal Title')
        cy.get('.add-exp').type('12/31/20')

        cy.get('.add-button').click()

        cy.get('.add-detail').should('be.visible') 
    })
})


describe('Edit Deals',()=>{
    it('Adding New Deal',function (){
        cy.visit('/')

        cy.contains('Log In').click()
        .get('.username').type('admin')
        .get('.password').invoke('show').type('password')
        cy.contains('login').click()

        cy.contains('Edit Deals').click({force:true})

        cy.get('.add-title').type('New Deal Title')
        cy.get('.add-exp').type('12/31/20')
        cy.get('.add-detail').type('New Detailed Information')

        cy.get('.add-button').click()

        cy.contains('Deals').click({force:true})
        cy.contains('New Deal Title')
        cy.contains('12/31/20')
        cy.contains('New Detailed Information')

    })
})



describe('Edit Deals',()=>{
    it('Delete Recently Added Deal',function (){
        cy.visit('/')


        cy.contains('Log In').click()
        .get('.username').type('admin')
        .get('.password').invoke('show').type('password')
        cy.contains('login').click()

        cy.contains('Edit Deals').click({force:true})

        cy.get('.deals-list-info').its('length').then(($btn) => {

            cy.log($btn)

            cy.get('.deals-list-info').eq($btn-1).contains('delete').click()

          })
    })
})
