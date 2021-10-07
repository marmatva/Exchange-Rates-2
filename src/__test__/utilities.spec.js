import {calculateConversion, getTodaysDate} from '../utilities.js'

describe('Test utilities module', ()=>{
    test('Test conversion', ()=>{
        let response = {
            amount: 0,
            rate: 1.5,
            result: 0,
        }
        let object = {
            amount: 2
        }
        let result = calculateConversion(object, response)
        expect(result).toEqual({amount: 2, rate: 1.5, result: 3})
    })

    test('Test getting todays date', ()=>{
        let day = (new Date().getDate()).toString();
        let month = (new Date().getMonth()+1).toString();
        let year = new Date().getFullYear();

        if(day.length<2){
            day = "0"+day
        }

        if(month.length<2){
            month = "0"+month
        }

        let result = getTodaysDate()

        expect(result).toEqual(`${year}-${month}-${day}`)
    })
})