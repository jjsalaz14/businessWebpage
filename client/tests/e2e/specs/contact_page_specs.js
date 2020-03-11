describe('Edit Contact Information',()=>{
    it('Phone Number Missing',function (){
        cy.visit('/')

        cy.contains('Log In').click()
        .get('.username').type('admin')
        .get('.password').invoke('show').type('password')
        
        cy.contains('login').click()

        cy.contains('Edit Contact').click({force:true})

        cy.get('.phone-num')
        .clear()

        cy.contains('save')
        .click()
        .get('.phone-num').should('be.visible') 
    })
})

describe('Edit Contact Information',()=>{
    it('Change Phone Number ',function (){
        cy.visit('/')

        cy.contains('Log In').click()
        .get('.username').type('admin')
        .get('.password').invoke('show').type('password')
        cy.contains('login').click()
        cy.contains('Edit Contact').click({force:true})


        cy.get('.phone').then(($phone) => {

            const txt = $phone.text()
            const num = txt.slice(1,14)

            cy.get('.phone-num')
            .clear()
            .type('(123)456-7890')

            cy.contains('save')
            .click()

            cy.contains('Show Contact Info').click({force:true})
            cy.contains('(123)456-7890')

            cy.contains('Edit Contact').click({force:true})

            cy.get('.phone-num')
            .clear()
            .type(num)

            cy.contains('save')
            .click()

            cy.contains('Show Contact Info').click({force:true})
            cy.contains(num)

        })
        
    })
})