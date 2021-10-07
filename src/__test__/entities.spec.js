import{ CurrencyList, ConversionRquestParameters, ExchangeRates, ConversionRateResults, ConversionRequestParameters} from '../entities.js'

describe('Test entities module', ()=>{
    test('Test conversion request parameters class', ()=>{
        let x= "testFrom"
        let y= "testTo"
        let z= "testAmount"
        let result = new ConversionRequestParameters(x, y, z)
        expect(result).toBeInstanceOf(ConversionRequestParameters);
        expect(result).toEqual({from: x, to: y, amount: z})
    })

    test('Test exchange rates class', ()=>{
        let testObject ={
            base: "testBase",
            date: "testDate",
            rates: "testRate"
        }

        let result = new ExchangeRates(testObject)
        expect(result).toBeInstanceOf(ExchangeRates)
        expect(result).toEqual({base: testObject.base, date: testObject.date, rates: testObject.rates})
    })

    test('Test conversion rate results class', ()=>{
        let testObjetc = {
            date:"testDate",
            from:"USD",
            to:"EUR",
            rate:"1",
            amount:"100",
            result:"117",
        }

        let result = new ConversionRateResults(testObjetc)

        expect(result).toBeInstanceOf(ConversionRateResults);
        expect(result).toEqual({date: testObjetc.date, from: testObjetc.from, to: testObjetc.to, rate: testObjetc.rate, amount: testObjetc.amount, result: testObjetc.result});
    })

    test('Test currency list class', ()=>{
        let testObject = {
            USD:{
                code: "USD",
            },
            EUR:{
                code: "EUR"
            }
        }

        let result = new CurrencyList(testObject);

        expect(result).toBeInstanceOf(CurrencyList);
        expect(result).toEqual({USD:{code: "USD"}, EUR:{code: "EUR"}});
    })
})