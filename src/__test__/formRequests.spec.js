jest.mock('../menuui.js', ()=>({
    prepareToDisplayResponse: jest.fn()
}))

jest.mock('../service.js', ()=>({
    getCurrencyConversion: jest.fn(()=>"test"),
    getExchangeRates: jest.fn(()=>"test")
}))

jest.mock('../ratesui.js', ()=>({
    displayApiResponse: jest.fn(),
    displayExchangeRates: jest.fn(),
    displayRateConversion: jest.fn()
}))

jest.mock('../entities.js', ()=>({
    ConversionRequestParameters: jest.fn()
}))

import fixture from './completedFormsFixture.js'
import {requestExchangeRates, requestCurrencyConversion} from '../formRequests.js'
import * as mockMenuUi from '../menuui.js'
import * as mockEntities from '../entities.js'
import * as mockService from '../service.js'
import * as mockRatesUi from '../ratesui.js'


describe('Test form requests module', ()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
        document.body.innerHTML = fixture;
    })
    test('Test the request of exchnage rates', async ()=>{
        let form = document.querySelector('form[name="exchange-rate-form"]')
        let parent = document.querySelector('section.exchange-rate-menu');
        await requestExchangeRates(form)
        expect(mockMenuUi.prepareToDisplayResponse).toHaveBeenCalledTimes(1);
        expect(mockMenuUi.prepareToDisplayResponse).toHaveBeenLastCalledWith(parent);
        expect(mockService.getExchangeRates).toHaveBeenCalledTimes(1);
        expect(mockService.getExchangeRates).toHaveBeenLastCalledWith("USD", "latest");
        expect(mockRatesUi.displayApiResponse).toHaveBeenCalledTimes(1)
        expect(mockRatesUi.displayApiResponse).toHaveBeenLastCalledWith("test", mockRatesUi.displayExchangeRates)
    })

    test('Test the request of currencies conversion', async ()=>{
        let form = document.querySelector('form[name="convert-currency-form"]');
        let parent = document.querySelector('section.convert-currency-menu');
        
        mockEntities.ConversionRequestParameters.mockImplementationOnce(()=>({value: "test"}));
        
        await requestCurrencyConversion(form)

        expect(mockEntities.ConversionRequestParameters).toHaveBeenCalledTimes(1);
        expect(mockEntities.ConversionRequestParameters).toHaveBeenLastCalledWith("USD", "EUR", "5864");

        expect(mockMenuUi.prepareToDisplayResponse).toHaveBeenCalledTimes(1);
        expect(mockMenuUi.prepareToDisplayResponse).toHaveBeenLastCalledWith(parent);
        expect(mockService.getCurrencyConversion).toHaveBeenCalledTimes(1);
        expect(mockService.getCurrencyConversion).toHaveBeenLastCalledWith({value: "test", date: "2021-10-07"});
        expect(mockRatesUi.displayApiResponse).toHaveBeenCalledTimes(1);
        expect(mockRatesUi.displayApiResponse).toHaveBeenLastCalledWith("test",mockRatesUi.displayRateConversion);
    })
})