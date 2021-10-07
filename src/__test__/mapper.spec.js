import { ConversionRateResults, CurrencyList, ExchangeRates } from "../entities.js";
import { mapCurrencyList, mapExchangeRates, mapCurrencyConversion} from '../mapper.js';

describe('Test mapper module', ()=>{
    test('Test maping exchange rates', ()=>{
        let testObject = {
            base: "USD",
            date: "2021-10-05",
            rates: [{example: 1}, {example: 2}]
        }

        let result = mapExchangeRates(testObject);
        expect(result).toBeInstanceOf(ExchangeRates);
    })

    test('Test maping currencies conversion', ()=>{
        let testObject = {
            date: "2021-10-05",
            result: 1,
            query: {
                from: "USD",
                to: "USD",
                amount: 1
            },
            info: {
                rate: 1,
            }
        }

        let result = mapCurrencyConversion(testObject);
        expect(result).toBeInstanceOf(ConversionRateResults);
    })

    test('Test mapping currency list', ()=>{
        let testObject = {
            symbols: {
                USD: {
                    description: "United States Dollar",
                    code: "USD"
                }
            }
        }

        let result = mapCurrencyList(testObject);
        expect(result).toBeInstanceOf(CurrencyList);
    })
})