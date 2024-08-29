const locators = {
    LOGIN: {
        EMAIL_INPUT: '[data-test="email"]',
        PASSWORD_INPUT: '[data-test="passwd"]',
        BTN_LOGIN: '.btn'
    },
    MENU: {
        SETTINGS:'[data-test="menu-settings"]',
        HOME:'[data-test="menu-home"]',
        EXTRACT: '[data-test="menu-extrato"]',
        MOVEMENTS:'[data-test="menu-movimentacao"]'
    },
    SETTINGS: {
        RESET:'[href="/reset"]',
        ACCOUNTS: '[href="/contas"]',
        MOVEMENTS: '[data-test="menu-movimentacao"]'
    },
    NOTIFICATION: '.toast-message',
    ACCOUNTS_TAB: {
        ACCOUNT_NAME_INPUT: '[data-test="nome"]',
        BTN_INTERACT_ACCOUNT: '.btn',
        BTN_EDIT_ACCOUNT:"//table//td[text() = 'Conta para alterar']//following-sibling::td//i[@class='far fa-edit']"
    },
    MOVEMENTS_TAB: {
        DESCRIPTION_INPUT:'[data-test="descricao"]',
        VALUE_INPUT:'[data-test="valor"]',
        INVOLVED_INPUT: '[data-test="envolvido"]',
        BTN_SAVE: '.btn-primary',
    },
    EXTRACT_TAB: {
        MOVEMENTS_LIST: '.list-group >'
    },
    BALANCE_TAB:{
        FN_TRANSACTION: (transacao) => `//td[contains(.,'${transacao}')]/../td[2]`
    }
}

export default locators;