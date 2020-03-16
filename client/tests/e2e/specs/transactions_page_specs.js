describe('Add Transaction',()=>{
    it('Type of Transaction Missing',function (){
        cy.visit('/')

        cy.contains('Log In').click()
        .get('.username').type('admin')
        .get('.password').invoke('show').type('password')
        cy.contains('login').click()

        cy.contains('Add Transaction').click({force:true})

        cy.contains('Add To Cart').click()

        cy.get('.trans-type').should('be.visible') 
    })
})


describe('Add Transaction',()=>{
    it('Error: Amount And Quantity Equal To 0',function (){
        cy.visit('/')

        cy.contains('Log In').click()
        .get('.username').type('admin')
        .get('.password').invoke('show').type('password')
        cy.contains('login').click()

        cy.contains('Add Transaction').click({force:true})

        cy.get('.trans-type').select('Expense')
        cy.get('.trans-desc').type('New Transaction Description')

        cy.contains('Add To Cart').click()

        cy.contains('Error: Number Has To Be Greater Than 0')

    })
})

describe('Add Transaction',()=>{
    it('Error: Amount And Quantity Not A Number',function (){
        cy.visit('/')

        cy.contains('Log In').click()
        .get('.username').type('admin')
        .get('.password').invoke('show').type('password')
        cy.contains('login').click()

        cy.contains('Add Transaction').click({force:true})

        cy.get('.trans-type').select('Expense')
        cy.get('.trans-desc').type('New Transaction Description')
        cy.get('.trans-quantity').clear().type('a')
        cy.get('.trans-amount').clear().type('b')

        cy.contains('Add To Cart').click()

        cy.contains('Error: Not A Number')

    })
})

describe('Add Transaction',()=>{
    it('Adding New Transaction, Expense',function (){
        cy.visit('/')

        cy.contains('Log In').click()
        .get('.username').type('admin')
        .get('.password').invoke('show').type('password')
        cy.contains('login').click()

        cy.contains('Add Transaction').click({force:true})

        cy.get('.trans-type').select('Expense')
        cy.get('.trans-desc').type('New Expense Testing')
        cy.get('.trans-quantity').clear().type('1')
        cy.get('.trans-amount').clear().type('1')

        cy.contains('Add To Cart').click()

        cy.contains('Total Expenses = 1')

        cy.contains('Complete Order').click()

        cy.contains('View Transactions').click({force:true})

        cy.contains('New Expense Testing').click()


    })
})

describe('Add Transaction',()=>{
    it('Adding New Transaction, Revenue',function (){
        cy.visit('/')

        cy.contains('Log In').click()
        .get('.username').type('admin')
        .get('.password').invoke('show').type('password')
        cy.contains('login').click()

        cy.contains('Add Transaction').click({force:true})

        cy.get('.trans-type').select('Revenue')
        cy.get('.trans-desc').type('New Revenue Testing')
        cy.get('.trans-quantity').clear().type('1')
        cy.get('.trans-amount').clear().type('1')

        cy.contains('Add To Cart').click()

        cy.contains('Total Revenue = 1')

        cy.contains('Complete Order').click()

        cy.contains('View Transactions').click({force:true})
        cy.contains('New Revenue Testing').click()


    })
})