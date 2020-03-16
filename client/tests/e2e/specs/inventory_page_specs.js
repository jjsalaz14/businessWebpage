describe('Add Inventory',()=>{
    it('Size Missing',function (){
        cy.visit('/')

        cy.contains('Log In').click()
        .get('.username').type('admin')
        .get('.password').invoke('show').type('password')
        cy.contains('login').click()

        cy.contains('Add Inventory').click({force:true})

        cy.get('.add-button').click()

        cy.get('.inven-size').should('be.visible') 
    })
})

describe('Add Inventory',()=>{
    it('Brand Missing',function (){
        cy.visit('/')

        cy.contains('Log In').click()
        .get('.username').type('admin')
        .get('.password').invoke('show').type('password')
        cy.contains('login').click()

        cy.contains('Add Inventory').click({force:true})

        cy.get('.inven-size').type('111/11R15')

        cy.get('.add-button').click()

        cy.get('.inven-brand').should('be.visible') 
    })
})


describe('Add Inventory',()=>{
    it('Add New Item To The Inventory',function (){
        cy.visit('/')

        cy.contains('Log In').click()
        .get('.username').type('admin')
        .get('.password').invoke('show').type('password')
        cy.contains('login').click()

        cy.contains('Add Inventory').click({force:true})

        cy.get('.inven-size').type('111/11R15')
        cy.get('.inven-brand').type('Testing Brand')
        cy.get('.inven-price').clear().type('100')
        cy.get('.inven-quantity').clear().type('3')
        cy.get('.inven-url').type('https://d2gvvn2873sxv5.cloudfront.net/pwN3656vXSdH3fkkXqcAsLXfP9E=/500x/tiregallery/1757/_1759.jpg')
        cy.get('.inven-category').select('New')

        cy.get('.add-button').click()

        cy.contains('Log Out').click()

        cy.contains('Inventory').click()

        cy.contains('111/11R15')
        cy.contains('Testing Brand')

    })
})


describe('Add Inventory',()=>{
    it('Update Recently Added Inventory Item',function (){
        cy.visit('/')


        cy.contains('Log In').click()
        .get('.username').type('admin')
        .get('.password').invoke('show').type('password')
        cy.contains('login').click()

        cy.contains('View/Edit Inventory').click({force:true})

        cy.get('.owner-inv-list').its('length').then(($btn) => {

            cy.log($btn)
            cy.get('.owner-inv-list').eq($btn-1).get('.inv-size').eq($btn-1).clear().type("222/22R15")
            cy.get('.owner-inv-list').eq($btn-1).get('.inv-brand').eq($btn-1).clear().type("Updated Brand")


            cy.get('.owner-inv-list').eq($btn-1).contains('Update').click()

            cy.contains('Log Out').click()

            cy.contains('Inventory').click({force:true})

            cy.contains('222/22R15')
            cy.contains('Updated Brand')

          })
    })
})

describe('Add Inventory',()=>{
    it('Delete Recently Added Inventory Item',function (){
        cy.visit('/')


        cy.contains('Log In').click()
        .get('.username').type('admin')
        .get('.password').invoke('show').type('password')
        cy.contains('login').click()

        cy.contains('View/Edit Inventory').click({force:true})

        cy.get('.owner-inv-list').its('length').then(($btn) => {

            const initialLength = $btn

            cy.get('.owner-inv-list').eq($btn-1).contains('Delete').click()

            cy.get('.owner-inv-list').its('length').then(($btn2) => {
                
                expect($btn2).to.equal(initialLength)

            })

          })
    })
})

