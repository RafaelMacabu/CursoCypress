/// <reference types="cypress" />

import dayjs from 'dayjs'
import '../../support/commandsAPI'

context('Should test at a backend level', () => {
    let auth
    beforeEach(() => {
        cy.getToken('a@a','a')
        cy.resetApp().its('status').should('be.equal',200)
    })

    it('Should create an account',() => {
        cy.request({
            method:'POST',
            url: '/contas',
            body:{
                nome:'Conta pelo backend' 
            }
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
        })
    })

    it('Should update an account',() => {
        cy.request({
            method:'GET',
            url: '/contas/',
            qs:{
                nome: 'Conta para alterar'
            }
        }).then(res => {
            cy.request({
                method:'PUT',
                url: `/contas/${res.body[0].id}`,
                body:{
                    nome:'Conta Alterada pelo backend' 
                }
            }).as('response')
        })
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(200)
        })
    })

    it('Inserting a repeating account', () => {
        cy.request({
            method:'POST',
            url: '/contas',
            body:{
                nome:'Conta mesmo nome' 
            },
            failOnStatusCode: false
        }).as('response')  
        
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
    })

    it('Should create a transaction',() => {
        cy.getConta('Conta para movimentacoes').then(id => {
            cy.request({
                method:'POST',
                url: '/transacoes',
                body:{
                    conta_id: id,
                    data_pagamento:	dayjs().add(1,'day').format('DD/MM/YYYY'),
                    data_transacao:	dayjs().format('DD/MM/YYYY'),
                    descricao: "a",
                    envolvido: "a",
                    status: true,
                    tipo: "REC",
                    valor: "500"
                }
            }).as('response')
        }) 
        
        cy.get('@response').its('status').should('be.equal',201)
        cy.get('@response').its('body.data_transacao').should('contain','2024')
        cy.get('@response').its('body.data_pagamento').should('contain','2024')

    })

    it('Should get balance',() => {
        cy.request({
            method:'GET',
            url: '/saldo',
        }).then(res => {
            let saldoConta = null
            res.body.forEach(conta => {
                if(conta.conta == 'Conta para saldo') {
                    saldoConta = conta.saldo
                }
            });
            expect(saldoConta).to.be.equal('534.00')
        })

        cy.getTransacoes('Movimentacao 1, calculo saldo')
        .then(res => {
            cy.request({
                method:'PUT',
                url: `/transacoes/${res.body[0].id}`,
                body: {
                    status: true,
                    data_transacao: dayjs(res.body[0].data_transacao).format('DD/MM/YYYY'),
                    data_pagamento: dayjs(res.body[0].data_pagamento).format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    valor: res.body[0].valor,
                    conta_id: res.body[0].conta_id
                }
            }).its('status').should('be.equal',200)

            cy.request({
                method:'GET',
                url: '/saldo',
            }).then(res => {
                let saldoConta = null
                res.body.forEach(conta => {
                    if(conta.conta == 'Conta para saldo') {
                        saldoConta = conta.saldo
                    }
                });
                expect(saldoConta).to.be.equal('4034.00')
            })
        })
    })

    it('Should remove a transaction', () => {
        cy.getTransacoes('Movimentacao para exclusao')
        .then(res => {
            cy.request({
                method:'DELETE',
                url: `/transacoes/${res.body[0].id}`,
            })
        }).its('status').should('be.equal',204)
    })
})