/// <reference types="cypress" />

import locators from '../../support/locators'
import '../../support/commandsContas'

context('Should test at a functional level', () => {
    beforeEach(() => {
        cy.visit('http://barrigareact.wcaquino.me')
        cy.loginBarriga('a@a','a')
    })
    afterEach(() => {
        cy.resetBarriga()
    })

    it('Should create an account',() => {
        cy.acessarContas()

        cy.inserirConta('Conta Nova')    
        
        cy.get(locators.NOTIFICATION).should('contain','inserida com sucesso')
    })

    it('Should update an account',() => {
        cy.acessarContas()

        cy.xpath(locators.ACCOUNTS_TAB.BTN_EDIT_ACCOUNT)
        .click()
        .get(locators.ACCOUNTS_TAB.ACCOUNT_NAME_INPUT)
        .clear()
        .type('Conta Alterada')
        .get(locators.ACCOUNTS_TAB.BTN_INTERACT_ACCOUNT)
        .click()

        cy.get(locators.NOTIFICATION).should('contain','atualizada com sucesso')
    })

    it.only('Inserting a repeating account', () => {
        cy.acessarContas()
        cy.intercept('POST','/contas').as('postAccount')
        cy.inserirConta('Conta Nova').wait('@postAccount')
        cy.inserirConta('Conta Nova')

        cy.get(locators.NOTIFICATION).should('contain','failed with status code 400')
    })

    it('Should create a transaction',() => {
        cy.get(locators.MENU.SETTINGS).click()
        cy.get(locators.SETTINGS.MOVEMENTS).click()

        cy.get(locators.MOVEMENTS_TAB.DESCRIPTION_INPUT).type('pix')
        cy.get(locators.MOVEMENTS_TAB.VALUE_INPUT).type('500.00')
        cy.get(locators.MOVEMENTS_TAB.INVOLVED_INPUT).type('rafael')
        cy.get(locators.MOVEMENTS_TAB.BTN_SAVE).click()
        cy.get(locators.NOTIFICATION).should('contain','Movimentação inserida com sucesso') 
        cy.get(locators.EXTRACT_TAB.MOVEMENTS_LIST).should('have.length','7')
    })
    it('Should get balance',() => {
        cy.xpath(locators.BALANCE_TAB.FN_TRANSACTION('Total')).should('contain','2.686,00')  
    })
})