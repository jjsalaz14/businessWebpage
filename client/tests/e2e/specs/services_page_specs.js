describe('Edit Services',()=>{
    it('Title of Service Missing',function (){
        cy.visit('/')

        cy.contains('Log In').click()
        .get('.username').type('admin')
        .get('.password').invoke('show').type('password')
        cy.contains('login').click()

        cy.contains('Edit Services').click({force:true})

        cy.contains('Add Service').click()

        cy.get('.title').should('be.visible') 
    })
})

describe('Edit Services',()=>{
    it('Description of Service Missing',function (){
        cy.visit('/')

        cy.contains('Log In').click()
        .get('.username').type('admin')
        .get('.password').invoke('show').type('password')
        cy.contains('login').click()

        cy.contains('Edit Services').click({force:true})

        cy.get('.title').type('New Title Sample')

        cy.contains('Add Service').click()

        cy.get('.description').should('be.visible') 
    })
})

describe('Edit Services',()=>{
    it('Adding New Service',function (){
        cy.visit('/')


        cy.contains('Log In').click()
        .get('.username').type('admin')
        .get('.password').invoke('show').type('password')
        cy.contains('login').click()

        cy.contains('Edit Services').click({force:true})

        cy.get('.title').type('New Title Sample')

        cy.get('.price')
        .clear()
        .type(10)
        
        cy.get('.description').type('New Description Sample')

        cy.contains('Add Service').click()

        cy.contains('Show Services').click({force:true})

        cy.contains('New Title Sample')
        cy.contains('10')
        cy.contains('New Description Sample')

    })
})


describe('Edit Services',()=>{
    it('Update Recently Added Service',function (){
        cy.visit('/')


        cy.contains('Log In').click()
        .get('.username').type('admin')
        .get('.password').invoke('show').type('password')
        cy.contains('login').click()

        cy.contains('Edit Services').click({force:true})

        cy.get('.servs').its('length').then(($btn) => {


            cy.get('.servs').eq($btn-1).get('.title-update').eq($btn-1).clear().type("updated title")
            cy.get('.servs').eq($btn-1).contains('update').click()

            cy.contains('Show Services').click({force:true})

            cy.contains('updated title')

          })
    })
})


describe('Edit Services',()=>{
    it('Delete Recently Added Service',function (){
        cy.visit('/')


        cy.contains('Log In').click()
        .get('.username').type('admin')
        .get('.password').invoke('show').type('password')
        cy.contains('login').click()

        cy.contains('Edit Services').click({force:true})

        cy.get('.servs').its('length').then(($btn) => {

            cy.log($btn)

            cy.get('.servs').eq($btn-1).contains('delete').click()

          })
    })
})


