Cypress.Commands.add('getToken',(user,password) => {
    cy.request({
        method:'POST',
        url:'http://barrigarest.wcaquino.me/signin',
        body:{
            email:user,
            redirecionar:'false',
            senha:password
        }
    }).its('body.token').should('not.be.empty')
    .then(token => {
        Cypress.env('token',token)
        return token
    })
})

Cypress.Commands.overwrite('request',(originalFn, ...options) => {
    if(options.length == 1){
        if(Cypress.env('token')){
            options[0].headers = {
                Authorization: `JWT ${Cypress.env('token')}`
        }
    }
 }

    return originalFn(...options)
})

Cypress.Commands.add('resetApp',() => {
    cy.request({
        method:'GET',
        url:'http://barrigarest.wcaquino.me/reset',
        
    })
})

Cypress.Commands.add('getConta',conta => {
    cy.request({
        method:'GET',
        url: '/contas/',
        qs:{
            nome: conta
        }
    }).then(res => {
        return res.body[0].id
    })
})

Cypress.Commands.add('getTransacoes', descricao => {
    cy.request({
        method:'GET',
        url: '/transacoes',
        qs: {
            descricao: descricao
        }
    }).then(res => {
        return res
    })
})