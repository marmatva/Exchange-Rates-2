jest.mock('../storage.js',()=>({
    getFromLocalStorage: jest.fn(),
    saveInLocalStorage: jest.fn()
}))

jest.mock('../mapper.js', ()=>({
    mapCurrencyList: jest.fn((x)=>x),
    mapCurrencyConversion: jest.fn((x)=>x),
    mapExchangeRates: jest.fn((x)=>x)
}))

jest.mock('../api.js', ()=>({
    requestExchangeRates: jest.fn(()=>"test"),
    requestCurrencyConversion: jest.fn(()=>"test"),
    requestSupportedSymbols: jest.fn(()=>"test")
}))

jest.mock('../utilities.js', ()=>({
    getTodaysDate: jest.fn(()=>"testDate"),
    calculateConversion: jest.fn((x)=>x)
}))

import { getSupportedSymbols, getExchangeRates, getCurrencyConversion} from "../service.js";
import * as mockStorage from '../storage.js'
import * as mockUtilities from '../utilities.js'
import * as mockApi from '../api.js'
import * as mockMapper from '../mapper.js'

describe('Test service module', ()=>{
    
    beforeEach(jest.clearAllMocks);

    test('Test getting supported Symbols', async ()=>{
        mockStorage.getFromLocalStorage
            .mockImplementationOnce(()=>null)
            .mockImplementationOnce((x)=>x);

        let firstResults = await getSupportedSymbols();
        expect(mockStorage.getFromLocalStorage).toHaveBeenCalledTimes(1);
        expect(mockStorage.getFromLocalStorage).toHaveBeenLastCalledWith("supportedSymbols");

        expect(mockApi.requestSupportedSymbols).toHaveBeenCalledTimes(1);
        expect(mockMapper.mapCurrencyList).toHaveBeenCalledTimes(1);
        expect(mockMapper.mapCurrencyList).toHaveBeenLastCalledWith("test");
        expect(mockStorage.saveInLocalStorage).toHaveBeenCalledTimes(1);
        expect(mockStorage.saveInLocalStorage).toHaveBeenLastCalledWith("supportedSymbols", "test");
        expect(firstResults).toEqual("test");
        
        let secondResult = await getSupportedSymbols();
        
        expect(mockStorage.getFromLocalStorage).toHaveBeenCalledTimes(2);
        expect(mockApi.requestSupportedSymbols).toHaveBeenCalledTimes(1);
        expect(secondResult).toEqual("supportedSymbols");
    })

    test('Test getting exchange rates', async ()=>{
        mockStorage.getFromLocalStorage
            .mockImplementationOnce(()=>null)
            .mockImplementationOnce((x)=>x)

        let firstResult = await getExchangeRates("testBase", "latest");
    
        expect(mockStorage.getFromLocalStorage).toHaveBeenCalledTimes(1);
        expect(mockStorage.getFromLocalStorage).toHaveBeenLastCalledWith("extchangeRate-basetestBase-ontestDate");

        expect(mockApi.requestExchangeRates).toHaveBeenCalledTimes(1);
        expect(mockApi.requestExchangeRates).toHaveBeenLastCalledWith("testBase", "latest");
        expect(mockMapper.mapExchangeRates).toHaveBeenCalledTimes(1);
        expect(mockMapper.mapExchangeRates).toHaveBeenLastCalledWith("test");
        expect(mockStorage.saveInLocalStorage).toHaveBeenCalledTimes(1);
        expect(mockStorage.saveInLocalStorage).toHaveBeenLastCalledWith("extchangeRate-basetestBase-ontestDate", "test");

        expect(firstResult).toEqual("test");

        let secondResult = await getExchangeRates("testBase", "testDate");
        
        expect(mockStorage.getFromLocalStorage).toHaveBeenCalledTimes(2);
        expect(mockStorage.getFromLocalStorage).toHaveBeenLastCalledWith("extchangeRate-basetestBase-ontestDate")
        expect(mockApi.requestExchangeRates).toHaveBeenCalledTimes(1);
        expect(secondResult).toEqual("extchangeRate-basetestBase-ontestDate");
    })

    test('Test getting currencies converted', async ()=>{
        mockStorage.getFromLocalStorage
            .mockImplementationOnce(()=>null)
            .mockImplementationOnce(x=>({amount: 1}))
            .mockImplementationOnce(x=>({amount: 2}));

        let firstObject = {
            from: "testFrom",
            to: "testTo"
        }

        let firstResult = await getCurrencyConversion(firstObject);


        expect(mockStorage.getFromLocalStorage).toHaveBeenCalledTimes(1);
        expect(mockStorage.getFromLocalStorage).toHaveBeenLastCalledWith("conversionRate-fromtestFrom-totestTo-ontestDate");
        expect(mockApi.requestCurrencyConversion).toHaveBeenCalledTimes(1);
        expect(mockApi.requestCurrencyConversion).toHaveBeenLastCalledWith(firstObject);
        expect(mockMapper.mapCurrencyConversion).toHaveBeenCalledTimes(1);
        expect(mockMapper.mapCurrencyConversion).toHaveBeenLastCalledWith("test");
        expect(mockStorage.saveInLocalStorage).toHaveBeenCalledTimes(1);
        expect(mockStorage.saveInLocalStorage).toHaveBeenLastCalledWith("conversionRate-fromtestFrom-totestTo-ontestDate", "test");
        expect(firstResult).toEqual("test");

        let secondObject={
            ...firstObject,
            date: "testDate",
            amount: 1
        }

        let secondResult = await getCurrencyConversion(secondObject);

        expect(mockStorage.getFromLocalStorage).toHaveBeenCalledTimes(2);
        expect(mockStorage.getFromLocalStorage).toHaveBeenLastCalledWith("conversionRate-fromtestFrom-totestTo-ontestDate");
        expect(mockApi.requestCurrencyConversion).toHaveBeenCalledTimes(1);
        expect(mockUtilities.calculateConversion).not.toHaveBeenCalled();
        expect(secondResult).toEqual({amount: 1});
        
        let thirdResult = await getCurrencyConversion(secondObject);

        expect(mockStorage.getFromLocalStorage).toHaveBeenCalledTimes(3);
        expect(mockStorage.getFromLocalStorage).toHaveBeenLastCalledWith("conversionRate-fromtestFrom-totestTo-ontestDate");
        expect(mockApi.requestCurrencyConversion).toHaveBeenCalledTimes(1);
        expect(mockUtilities.calculateConversion).toHaveBeenCalledTimes(1);
        expect(mockUtilities.calculateConversion).toHaveBeenLastCalledWith(secondObject, {amount: 2});
        expect(thirdResult).toEqual(secondObject);

    })
})