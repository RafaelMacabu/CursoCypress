/// <reference types="cypress" />

import locators from '../../support/locators'
import '../../support/commandsContas'
import buildEnv from '../../support/buildEnv'

context('Should test at a frontend level', () => {
    before(() => {
    })
    beforeEach(() => {
        cy.visit('http://barrigareact.wcaquino.me')
        buildEnv()
        cy.loginBarriga('a@a', 'a')

        //cy.resetBarriga()
    })
    after(() => {
        cy.clearLocalStorage()
    })

    it('Should create an account', () => {
        cy.intercept('POST', '/contas', {
            statusCode: 201,
            body: {
                id: 2240836, nome: "Conta Nova", visivel: true, usuario_id: 69
            }
        }).as('postAccounts')

        cy.acessarContas()

        cy.intercept('GET', '/contas', {
            statusCode: 200,
            body: [{ "id": 2240834, "nome": "CONTA MOCK", "visivel": true, "usuario_id": 1 },
            { "id": 2240835, "nome": "CONTA MOCK", "visivel": true, "usuario_id": 2 },
            { "id": 2240836, "nome": "Conta Nova", "visivel": true, "usuario_id": 69 }]
        }).as('getAccounts')

        cy.inserirConta('Conta Nova')

        cy.get(locators.NOTIFICATION).should('contain', 'inserida com sucesso')
    })

    it('Should update an account', () => {
        cy.intercept('PUT', '/contas/**', {
            statusCode: 200,
            body: {
                id: 2240834, nome: "Conta Alterada", visivel: true, usuario_id: 1
            }
        }).as('putAccounts')

        cy.acessarContas()

        cy.xpath(locators.ACCOUNTS_TAB.BTN_EDIT_ACCOUNT)
            .click()
            .get(locators.ACCOUNTS_TAB.ACCOUNT_NAME_INPUT)
            .clear()
            .type('Conta Alterada')
            .get(locators.ACCOUNTS_TAB.BTN_INTERACT_ACCOUNT)
            .click()

        cy.get(locators.NOTIFICATION).should('contain', 'atualizada com sucesso')
    })

    it('Inserting a repeating account', () => {
        cy.intercept('GET', '/contas', {
            statusCode: 200,
            body: [{ "id": 2240834, "nome": "CONTA MOCK", "visivel": true, "usuario_id": 1 },
            { "id": 2240835, "nome": "CONTA MOCK", "visivel": true, "usuario_id": 2 },
            { "id": 2240836, "nome": "Conta Nova", "visivel": true, "usuario_id": 69 }]
        }).as('getAccountsMesmoNome')

        cy.intercept('POST', '/contas', {
            statusCode: 400,
            body: {
                id: 2240836, nome: "Conta Nova", visivel: true, usuario_id: 69
            }
        }).as('postAccountsMesmoNome')

        cy.acessarContas()
        cy.inserirConta('Conta Nova')

        cy.get(locators.NOTIFICATION).should('contain', 'failed with status code 400')
    })

    it('Should create a transaction', () => {
        cy.intercept('POST', '/transacoes', {
            statusCode: 200,
            body: {
                "id": 2102807,
                "descricao": "a",
                "envolvido": "a",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2024-08-27T03:00:00.000Z",
                "data_pagamento": "2024-08-27T03:00:00.000Z",
                "valor": "213.00",
                "status": false,
                "conta_id": 2240835,
                "usuario_id": 1,
                "transferencia_id": null,
                "parcelamento_id": null
            }
        }).as('postTransaction')

        cy.get(locators.MENU.SETTINGS).click()
        cy.get(locators.SETTINGS.MOVEMENTS).click()

        cy.get(locators.MOVEMENTS_TAB.DESCRIPTION_INPUT).type('pix')
        cy.get(locators.MOVEMENTS_TAB.VALUE_INPUT).type('500.00')
        cy.get(locators.MOVEMENTS_TAB.INVOLVED_INPUT).type('rafael')

        cy.intercept('GET', '/extrato/**', {
            statusCode: 200,
            fixture: 'movimentacaoSalva.json'
        }).as('getExtract')

        cy.get(locators.MOVEMENTS_TAB.BTN_SAVE).click()

        cy.get(locators.NOTIFICATION).should('contain', 'Movimentação inserida com sucesso')
        cy.get(locators.EXTRACT_TAB.MOVEMENTS_LIST).should('have.length', '4')
    })

    it('Should get balance', () => {
        cy.xpath(locators.BALANCE_TAB.FN_TRANSACTION('Conta para extrato')).should('contain', '-R$ 999.999,00')
    })

    it('Should validate data sent to create an account', () => {
        cy.intercept('POST', '/contas',req => {
            req.reply({
                statusCode: 201,
            body: {
                id: 2240836, nome: "Conta Nova", visivel: true, usuario_id: 69
            }
            })
            expect(req.body.nome).to.be.not.empty
            expect(req.headers.authorization).to.exist
        }).as('postAccounts')

        cy.acessarContas()

        cy.intercept('GET', '/contas', {
            statusCode: 200,
            body: [{ "id": 2240834, "nome": "CONTA MOCK", "visivel": true, "usuario_id": 1 },
            { "id": 2240835, "nome": "CONTA MOCK", "visivel": true, "usuario_id": 2 },
            { "id": 2240836, "nome": "Conta Nova", "visivel": true, "usuario_id": 69 }]
        }).as('getAccounts')

        cy.inserirConta('Conta Nova')
        
        cy.get(locators.NOTIFICATION).should('contain', 'inserida com sucesso')
    })

    it('Should test colors', () => {
        cy.get(locators.MENU.EXTRACT).click()
        cy.viewport('ipad-mini')
    })
})