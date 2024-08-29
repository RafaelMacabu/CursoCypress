// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import locators from "./locators"

Cypress.Commands.add('clickAlert',(locator,message) => {
    cy.get(locator).click()       
    cy.on('window:alert',msg =>{
        expect(msg).to.be.equal(message)
    })
})

Cypress.Commands.add('loginBarriga',(email,password) => {
    cy.get(locators.LOGIN.EMAIL_INPUT)
        .type(email)
        cy.get(locators.LOGIN.PASSWORD_INPUT)
        .type(password)
        cy.get(locators.LOGIN.BTN_LOGIN)
        .click()

        cy.get(locators.NOTIFICATION).should('contain','Bem vindo, ')
})

Cypress.Commands.add('resetBarriga',() => {
    cy.intercept('/reset').as('reset')

    cy.get(locators.MENU.SETTINGS)
        .click()
        .get(locators.SETTINGS.RESET)
        .click()

    cy.wait('@reset')
})