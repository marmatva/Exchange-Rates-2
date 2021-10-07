jest.mock('../menuui.js', ()=>({
    showInvalidInput: jest.fn(),
    removeInvalidStyle: jest.fn(),
    prepareToDisplayResponse: jest.fn()
}))

jest.mock('../ratesui.js', ()=>({
    allowDisplayResults: jest.fn(),
    displayApiResponse: jest.fn(),
    displayExchangeRates: jest.fn()
}))

jest.mock('../service.js', ()=>({
    getCurrencyConversion: jest.fn(()=>"test"),
    getExchangeRates: jest.fn(()=>"test")
}))

jest.mock('../formRequests.js', ()=>({
    requestExchangeRates: jest.fn(),
    requestCurrencyConversion: jest.fn()
}))

import * as mockMenuUi from '../menuui.js'
import * as mockRatesUi from '../ratesui.js'
import * as mockService from '../service.js'
import {manageRequestSubmitted, reviewInputChange}from '../form.js'
import * as mockFormRequests from '../formRequests.js'
import fixture from './fixture.js'
import completedFormFixture from './completedFormsFixture.js'

describe('Test form module', ()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
        document.body.innerHTML = fixture;
    })

    test('Test reviewing input change',()=>{
        let testObject = {
            target: document.querySelector('#convert-currency-amount')
        }
        reviewInputChange(testObject);
        expect(mockMenuUi.showInvalidInput).toHaveBeenCalledTimes(1);
        expect(mockMenuUi.showInvalidInput).toHaveBeenLastCalledWith({"element": testObject.target, "error": "Please select a number greater than 0"});
        expect(mockMenuUi.removeInvalidStyle).toHaveBeenCalledTimes(0);
        
        let selectInput = document.querySelector('#convert-currency-to');
        selectInput.value = "USD"
        testObject.target = selectInput;

        reviewInputChange(testObject)
        expect(mockMenuUi.showInvalidInput).toHaveBeenCalledTimes(1);
        expect(mockMenuUi.removeInvalidStyle).toHaveBeenCalledTimes(1);
        expect(mockMenuUi.removeInvalidStyle).toHaveBeenLastCalledWith(testObject.target);
    })

    test('Test how request are managed',()=>{
        let testObject = {
            preventDefault: jest.fn(),
            target: {parentElement:{elements:[document.querySelector('#convert-currency-amount'), document.querySelector('#convert-currency-to'), "submitInput"]}}
        }

        manageRequestSubmitted(testObject);
        expect(testObject.preventDefault).toHaveBeenCalledTimes(1);
        expect(mockRatesUi.allowDisplayResults).toHaveBeenCalledTimes(1);
        expect(mockMenuUi.showInvalidInput).toHaveBeenCalledTimes(2)
        expect(mockMenuUi.showInvalidInput).toHaveBeenCalledWith({"element": testObject.target.parentElement.elements[0], "error": "Please select a number greater than 0"})
        expect(mockMenuUi.showInvalidInput).toHaveBeenCalledWith({"element": testObject.target.parentElement.elements[1], "error": "Currency selection cannot be empty"})
    })

    test('Test how request exchange rates are managed', async ()=>{
        document.body.innerHTML = completedFormFixture;
        let testObject = {
            preventDefault: jest.fn(),
            target: {
                parentElement: document.querySelector('form[name="exchange-rate-form"]')
            }
        }
        //document.querySelector('#exchange-rates-currency option').value = "USD"
        //testObject.target.parentElement.elements[0].value = "USD"
        manageRequestSubmitted(testObject)
        //expect.assertions(9)
        expect(testObject.preventDefault).toHaveBeenCalledTimes(1);
        expect(mockRatesUi.allowDisplayResults).toHaveBeenCalledTimes(1);
        expect(mockMenuUi.showInvalidInput).toHaveBeenCalledTimes(0);
        expect(mockFormRequests.requestExchangeRates).toHaveBeenCalledTimes(1);
        // expect(mockMenuUi.prepareToDisplayResponse).toHaveBeenCalledTimes(1);
        // expect(mockMenuUi.prepareToDisplayResponse).toHaveBeenLastCalledWith(form.parentElement);
        // expect(mockService.getExchangeRates).toHaveBeenCalledTimes(1);
        // expect(mockService.getExchangeRates).toHaveBeenLastCalledWith(("USD", "latest"));
        // expect(mockRatesUi.displayApiResponse).toHaveBeenCalledTimes(1)
        // expect(mockRatesUi.displayApiResponse).toHaveBeenLastCalledWith("test", mockRatesUi.displayExchangeRates)
    })

    test('Test how request conversion rates are managed', ()=>{
        document.body.innerHTML = completedFormFixture;
        let testObject = {
            preventDefault: jest.fn(),
            target: {
                parentElement: document.querySelector('form[name="convert-currency-form"]')
            }
        }
        
        manageRequestSubmitted(testObject)
        expect(testObject.preventDefault).toHaveBeenCalledTimes(1);
        expect(mockRatesUi.allowDisplayResults).toHaveBeenCalledTimes(1);
        expect(mockMenuUi.showInvalidInput).toHaveBeenCalledTimes(0);
        expect(mockFormRequests.requestCurrencyConversion).toHaveBeenCalledTimes(1);
    })

})