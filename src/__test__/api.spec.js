import { requestExchangeRates, requestSupportedSymbols, requestCurrencyConversion } from "../api";

describe('Test Api Module', ()=>{
    global.fetch = jest.fn(()=>new Promise(r=>r({json:()=>"test"})))
    beforeEach(jest.clearAllMocks)

    test('Test requesting exchnage rates', async ()=>{
        let result = await requestExchangeRates("testBase", "testDate");

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenLastCalledWith("https://api.exchangerate.host/testDate?base=testBase&places=4");
        expect(result).toEqual("test")
    })

    test('Test requesting supported symbols', async ()=>{
        let result = await requestSupportedSymbols();

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenLastCalledWith("https://api.exchangerate.host/symbols");
        expect(result).toEqual("test")
    })

    test('Test request currency conversion', async ()=>{
        let firstObject = {
            from: "testFrom",
            to: "testTo",
            amount: "testAmount"
        }

        let firstResult = await requestCurrencyConversion(firstObject);
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenLastCalledWith("https://api.exchangerate.host/convert?from=testFrom&to=testTo&amount=testAmount");
        expect(firstResult).toEqual("test");

        let secondObject = {
            ...firstObject,
            date: "testDate"
        }

        let secondResult = await requestCurrencyConversion(secondObject);
        expect(global.fetch).toHaveBeenCalledTimes(2);
        expect(global.fetch).toHaveBeenLastCalledWith("https://api.exchangerate.host/convert?from=testFrom&to=testTo&amount=testAmount&date=testDate");
        expect(secondResult).toEqual("test");
    })
})