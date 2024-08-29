const buildEnv = () => {
    cy.intercept('POST','/signin',req => {
        req.reply({
        statusCode:200,
        body:{
            id:	1000,
            nome:"usuariofalsooooo",
            token:"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
        }
        })
        expect(req.body.email).to.be.not.empty
        expect(req.body.senha).to.be.not.empty
    }).as('signIn')

    cy.intercept('GET','/saldo',{
        body:
            [{"conta_id":2235443,"conta":"Conta para movimentacoes","saldo":"999999"},
                {"conta_id":2235444,"conta":"Conta com movimentacao","saldo":"999999"},
                {"conta_id":2235445,"conta":"Conta para saldo","saldo":"999999"},
                {"conta_id":2235446,"conta":"Conta para extrato","saldo":"-999999"}]
        
    }).as('saldo')

    cy.intercept('GET','/contas',{
        statusCode:200,
        body:  [{"id":2240834,"nome":"Conta para alterar","visivel":true,"usuario_id":1},
                {"id":2240835,"nome":"CONTA MOCK","visivel":true,"usuario_id":2}] 
    }).as('getAccounts')

    cy.intercept('GET','/extrato/**',{
        statusCode:200,
        body: [{"conta":"Conta para movimentacoes","id":2102791,"descricao":"Receita Paga","envolvido":"AAA","observacao":null,"tipo":"REC","data_transacao":"2024-08-27T03:00:00.000Z","data_pagamento":"2024-08-27T03:00:00.000Z","valor":"1500.00","status":true,"conta_id":2240836,"usuario_id":1,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta para movimentacoes","id":2102791,"descricao":"Despesa pendente","envolvido":"AAA","observacao":null,"tipo":"DESP","data_transacao":"2024-08-27T03:00:00.000Z","data_pagamento":"2024-08-27T03:00:00.000Z","valor":"-1500.00","status":false,"conta_id":2240836,"usuario_id":1,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta para movimentacoes","id":2102791,"descricao":"Receita pendente","envolvido":"AAA","observacao":null,"tipo":"REC","data_transacao":"2024-08-27T03:00:00.000Z","data_pagamento":"2024-08-27T03:00:00.000Z","valor":"1500.00","status":false,"conta_id":2240836,"usuario_id":1,"transferencia_id":null,"parcelamento_id":null}
        ]      
    }).as('getExtract')
}

export default buildEnv