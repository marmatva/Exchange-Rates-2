jest.mock('../menuui.js', ()=>({
    removeLoadingMessage: jest.fn()
}))

jest.mock('../utilities.js', ()=>({
    getTodaysDate: jest.fn()
}))

import { allowDisplayResults, displayApiResponse, displayExchangeRates, displayRateConversion, removePreviousResults } from "../ratesui";
import * as mockMenuUi from '../menuui.js'
import * as mockUtilities from '../utilities.js';
import fixture from './fixture.js'
import exchangeRatesFixture from './AFNfixture.json'
import conversionRateFixture from './AFNtoALL.json'

describe('Test rates ui module', ()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
        document.body.innerHTML=fixture;
    })
    test('Test firstfunctions', ()=>{
        let testFunction = jest.fn(x=>x)
        
        allowDisplayResults(false);
        displayApiResponse("test", testFunction);
        expect(mockMenuUi.removeLoadingMessage).toHaveBeenCalledTimes(1);
        expect(testFunction).toHaveBeenCalledTimes(0);
        
        allowDisplayResults();
        displayApiResponse("test", testFunction);
        expect(mockMenuUi.removeLoadingMessage).toHaveBeenCalledTimes(2);
        expect(testFunction).toHaveBeenCalledTimes(1);
        expect(testFunction).toHaveBeenLastCalledWith("test");
    })

    test('Test the display of Exchnage Rates, and removing results', ()=>{
        displayExchangeRates(exchangeRatesFixture);
        
        let displayContainer = document.querySelector('section.exchange-rates-container');
        expect(displayContainer).not.toBeNull();
        expect(displayContainer.className).toContain('results-display');
        expect(displayContainer.parentElement).toEqual(document.querySelector('main main'))
        expect(displayContainer.parentElement.className).toContain('bigger-width')
        
        expect(displayContainer.querySelector('div').className).toContain('rates-result-heading-container')
        expect(displayContainer.querySelector('div H3').textContent).toEqual('Currencies Rates')
        expect(displayContainer.querySelector('div H4').textContent).toEqual('Currencies equivalence with base AFN on 2021-10-04')
        
        let cards =displayContainer.querySelectorAll('article') 
        expect(cards.length).toEqual(170)
        
        let card = cards[1]
        expect(card.className).toContain('exchange-rate-card');
        expect(card.querySelector('h4').textContent).toEqual('AFN');
        expect(card.querySelector('h4').className).toContain('exchange-rate-heading');
        expect(card.querySelector('p').textContent).toEqual('1 AFN =1 AFN');
        expect(card.querySelector('p').className).toContain('exchange-rate-equivalence');
        expect(card.querySelector('span').textContent).toEqual('1 AFN');
        
        removePreviousResults();
        expect(document.querySelector('section.exchange-rates-container')).toBeNull();
        expect(document.querySelector('main main').className).not.toContain('bigger-width')
    })

    test('Test displaying rate conversion, and removing results', ()=>{
        mockUtilities.getTodaysDate
            .mockImplementationOnce(()=>"2021-10-04")
            .mockImplementationOnce(()=>"2021-10-05")

        displayRateConversion(conversionRateFixture);
        
        let firstContainer = document.querySelector('article');
        expect(firstContainer).not.toBeNull();
        expect(firstContainer.className).toContain('results-display');
        expect(firstContainer.parentElement).toEqual(document.querySelector('main main'));
        
        expect(firstContainer.querySelector('h3').textContent).toEqual('Conversion Rate');
        expect(firstContainer.querySelector('p').textContent).toContain('1 AFN is equivalent to');
        expect(firstContainer.querySelector('p span').textContent).toContain('1.170569 ALL');
        expect(firstContainer.querySelector('p~p').textContent).toEqual('1 AFN = 1.170569 ALL');
        
        removePreviousResults();
        expect(document.querySelector('article')).toBeNull()
        
        displayRateConversion(conversionRateFixture)
        let secondContainer = document.querySelector('article')
        expect(secondContainer.querySelector('p').textContent).toContain('On 2021-10-04, 1 AFN where equivalent to');
    })

})