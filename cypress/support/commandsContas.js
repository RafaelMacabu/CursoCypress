import locators from "./locators"

Cypress.Commands.add('acessarContas',() => {
    cy.get(locators.MENU.SETTINGS)
        .click()
        .get(locators.SETTINGS.ACCOUNTS)
        .click()
})

Cypress.Commands.add('inserirConta',(Conta) => {
    cy.get(locators.ACCOUNTS_TAB.ACCOUNT_NAME_INPUT)
        .type(Conta)
        .get(locators.ACCOUNTS_TAB.BTN_INTERACT_ACCOUNT)
        .click()
})