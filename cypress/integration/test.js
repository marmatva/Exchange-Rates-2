/// <reference types="Cypress" />

const URL = 'http://127.0.0.1:8080';
const totalSymbols = 171;
const symbolsWithoutVEF = totalSymbols-1;

const pendingFetch = {
    statusCode: 202,
    delay: 5000
}

describe('Test de Exchange', ()=>{

    beforeEach(()=>{
        cy.intercept('https://api.exchangerate.host/symbols', {fixture: 'symbols.json'}).as('supportedSymbolsList')
        cy.visit(URL);
    })

    it('Uses the Navigations Tabs', ()=>{
        cy.get('.rate-options-tabs .tab-option-rate').should('have.length', 2);
        cy.get('.tab-option-rate.active-tab').should('have.text', "Get Exchange Rates");
        cy.get('#exchange-rates-currency option').should('have.length', totalSymbols+1);
        cy.get('.exchange-rate-menu').should('not.have.class', 'display-none')
        cy.get('.convert-currency-menu').should('have.class', 'display-none')
        cy.get('.rate-options-tabs .tab-option-rate').eq(1).click();
        cy.get('.tab-option-rate.active-tab').should('have.text', "Convert to Currencies");
        cy.get('.exchange-rate-menu').should('have.class', 'display-none')
        cy.get('.convert-currency-menu').should('not.have.class', 'display-none')
        cy.get('#convert-currency-from option').should('have.length', totalSymbols+1);
        cy.get('#convert-currency-to option').should('have.length', totalSymbols+1);
    })
    
    it('Tries Exchange form validation', ()=>{
        cy.get('#request-exchange-rate').click();
        
        cy.get('#exchange-rates-currency').should('have.class', 'invalid-input')
        cy.get('label[for="exchange-rates-currency"] p').should('have.class', 'invalid-input-message')
        cy.get('label[for="exchange-rates-currency"] p').should('have.text', 'Currency selection cannot be empty')
        
        cy.get('#request-exchange-rate').click();
        cy.get('p.invalid-input-message').should('have.length', 1)
        
        cy.get('#exchange-rates-currency').select(2);
        cy.get('p.invalid-input-message').should('not.exist');

        cy.get('#exchange-rate-date').then(inputDate =>{
            let maxDate = inputDate.attr('max');
            let today = new Date().toISOString().split('T')[0];
            cy.wrap(maxDate).should('equal', today);
        })
    })

    it('Tries Conversion Form and Validation', ()=>{
        cy.get('.rate-options-tabs .tab-option-rate').eq(1).click();
        cy.get('#request-convert-currency').click();

        cy.get('#convert-currency-from').should('have.class', 'invalid-input')
        cy.get('label[for="convert-currency-from"] p').should('have.class', 'invalid-input-message')
        cy.get('label[for="convert-currency-from"] p').eq(-1).should('have.text', 'Currency selection cannot be empty')
        
        cy.get('#convert-currency-to').should('have.class', 'invalid-input')
        cy.get('label[for="convert-currency-to"] p').should('have.class', 'invalid-input-message')
        cy.get('label[for="convert-currency-to"] p').eq(-1).should('have.text', 'Currency selection cannot be empty')
        
        cy.get('#convert-currency-amount').should('have.class', 'invalid-input')
        cy.get('label[for="convert-currency-amount"] p').should('have.class', 'invalid-input-message')
        cy.get('label[for="convert-currency-amount"] p').should('have.text', 'Please select a number greater than 0')
        
        cy.get('#request-convert-currency').click();
        cy.get('label[for="convert-currency-to"] p').should('have.length', 2)
        cy.get('label[for="convert-currency-from"] p').should('have.length', 2)
        cy.get('label[for="convert-currency-amount"] p').should('have.length', 1)
        
        cy.get('#convert-currency-to').select(2)
        cy.get('#convert-currency-to').should('not.have.class', 'invalid-input')
        cy.get('label[for="convert-currency-to"] .invalid-input-message').should('not.exist')

        cy.get('#convert-currency-from').select(3)
        cy.get('#convert-currency-from').should('not.have.class', 'invalid-input')
        cy.get('label[for="convert-currency-from"] .invalid-input-message').should('not.exist')

        cy.get('#convert-currency-amount').type('58rku64')
        cy.get('#convert-currency-amount').should('have.value', "5864")

        cy.get('#convert-currency-date').then(inputDate =>{
            let max = inputDate.attr('max')
            let today = new Date().toISOString().split('T')[0]
            cy.wrap(max).should('equal', today)   
        })
    })
    
    it('Tries Loading Message', ()=>{
        cy.wait('@supportedSymbolsList')
        cy.intercept(/https:\/\/api.exchangerate.host\//, pendingFetch)
        cy.get('#exchange-rates-currency').select(2)
        cy.get('#request-exchange-rate').click()

        cy.get('.exchange-rate-menu').should('not.be.visible')
        cy.get('.loading-container').should('exist')
        cy.get('.loading-container .loading-wheel').should('exist')
        cy.get('.loading-container p').should('contain.text', 'Loading Results')
        cy.get('.loading-container p').should('have.class', 'loading-message')
        
        cy.get('.rate-options-tabs .tab-option-rate').eq(1).click()
        cy.get('.loading-container').should('not.exist')
        
        cy.get('#convert-currency-from').select(2)
        cy.get('#convert-currency-to').select(3)
        cy.get('#convert-currency-amount').type('5864')
        cy.get('#request-convert-currency').click()
        
        cy.get('.convert-currency-menu').should('not.be.visible')
        cy.get('.loading-container').should('exist')
        cy.get('.loading-container .loading-wheel').should('exist')
        cy.get('.loading-container p').should('contain.text', 'Loading Results')
        cy.get('.loading-container p').should('have.class', 'loading-message')
    })
    

    it('Checks Exchange Funcionality', ()=>{
        cy.wait('@supportedSymbolsList')
        cy.intercept(/https:\/\/api.exchangerate.host\//, {fixture: 'afn.json'}).as('exchangeRate')
        cy.get('#exchange-rates-currency').select(2)
        cy.get('#request-exchange-rate').click()

        cy.get('.exchange-rates-container').should('exist')
        cy.get('.rates-result-heading-container').should('exist')
        cy.get('.rates-result-heading-container h3').should('have.text', 'Currencies Rates')
        cy.get('.rates-result-heading-container h4').eq(0).should('have.text', 'Currencies equivalence with base AFN on 2021-10-04')
    
        cy.get('.exchange-rate-card').should('have.length', symbolsWithoutVEF);

        cy.get('.exchange-rate-card h4').eq(1).should('have.text', 'AFN')
        cy.get('.exchange-rate-card h4').eq(1).should('have.class', 'exchange-rate-heading')
        cy.get('.exchange-rate-card p').eq(1).should('have.text', '1 AFN =1 AFN')
        cy.get('.exchange-rate-card p').eq(1).should('have.class', 'exchange-rate-equivalence')
        cy.get('.exchange-rate-card p span').eq(1).should('have.text', '1 AFN')

        cy.get('.rate-options-tabs .tab-option-rate').eq(0).click();
        cy.get('.exchange-rates-container').should('not.exist')
    })

    it('Checks Conversion Funcionality', ()=>{
        cy.wait('@supportedSymbolsList')
        cy.get('.rate-options-tabs .tab-option-rate').eq(1).click()
        
        cy.intercept(/https:\/\/api.exchangerate.host\/convert/, {fixture: 'afntoall.json'}).as('conversionRate')
        cy.get('#convert-currency-from').select(2)
        cy.get('#convert-currency-to').select(3)
        cy.get('#convert-currency-amount').type('1')
        cy.get('#request-convert-currency').click()

        cy.get('.results-display').should('exist')
        cy.get('.results-display h3').should('have.text', 'Conversion Rate')
        cy.get('.results-display p').eq(0).should('have.text', 'On 2021-10-03, 1 AFN where equivalent to1.174381 ALL')
        cy.get('.results-display p span').eq(0).should('have.text', '1.174381 ALL')
        cy.get('.results-display p').eq(1).should('have.text', '1 AFN = 1.174381 ALL')

        cy.get('.rate-options-tabs .tab-option-rate').eq(1).click();
        cy.get('.results-display').should('not.exist')
    })
})