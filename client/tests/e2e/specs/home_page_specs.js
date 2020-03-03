describe('Home Page', function(){
    it('Finds Shop Name and Phone Number', function(){
        cy.visit('/')

        cy.contains('Texano Tire Shop')
        cy.contains('(760)123-4567')
    })
})

describe('Customer Contact Page', function(){
    it('Finds Elements in Contact Page', function(){
        cy.visit('/')
        cy.contains('Contact').click()

        cy.contains('(760)123-4567')
        cy.contains('123 Main Street')
        cy.contains('Friday: 8 AM - 5 PM')
        cy.contains('Sunday: Closed')
    })
})

describe('Customer Services Page', function(){
    it('Finds Elements in Services Page', function(){
        cy.visit('/')
        cy.contains('Services').click()

        cy.contains('New Tire')
        cy.contains('Tire Installation')
        cy.contains('Wheel Balance')
        cy.contains('Check Tire Pressure')
    })
})


describe('Login Unsuccessfully',()=>{
    it('Login With Incorrect Credentials',function (){
        cy.visit('/')

        cy.contains('Log In').click()
        .get('.username').type('student')
        .get('.password').invoke('show').type('12345')
        cy.contains('login').click()

        cy.contains('Incorrect ID or Password')
    })
})

describe('Login Successfully',()=>{
    it('Login With Correct Credentials',function (){
        cy.visit('/')

        cy.contains('Log In').click()
        .get('.username').type('admin')
        .get('.password').invoke('show').type('password')
        cy.contains('login').click()

        cy.contains('owner')
        cy.contains('Edit Services').click({force:true})
        cy.contains('Log Out').click()

        cy.contains('Log In').click()
    })
})

