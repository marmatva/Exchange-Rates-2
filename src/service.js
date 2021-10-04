import {getFromLocalStorage, saveInLocalStorage} from './storage.js'
import {ExchangeRates, CurrencyList, ConversionRateResults} from './entities.js'
import {requestExchangeRates, requestCurrencyConversion, requestSupportedSymbols} from './api.js'
import { calculateConversion, getTodaysDate } from './utilities.js'
import { mapCurrencyConversion, mapCurrencyList, mapExchangeRates } from './mapper.js';

function getExchangeRateKey(base, date){
    if(date==="latest"){
        date = getTodaysDate();
    }
    return `extchangeRate-base${base}-on${date}`
}

function getCurrencyConversionKey(object){
    if(object.date){
        return `conversionRate-from${object.from}-to${object.to}-on${object.date}`
    }    
    let date = getTodaysDate();
    return `conversionRate-from${object.from}-to${object.to}-on${date}`
}

export async function getSupportedSymbols(){
    let key = "supportedSymbols"
    try{
        let response = getFromLocalStorage(key);
        if(response === null){
            throw new Error("Supported Symbols haven't been saved yet");
        }
        return response
    }catch(e){
        let response = await requestSupportedSymbols();
        let results = mapCurrencyList(response);
        saveInLocalStorage(key, results);
        return results
    }
}

export async function getExchangeRates(base, date){
    let key = getExchangeRateKey(base, date);

    try{
        let response = getFromLocalStorage(key);
        if(response === null){
            throw new Error(`The Exchange Rates with base ${base} on ${date} haven't been saved yet`);
        }
        return response;
    } catch (e){
        let response = mapExchangeRates(await requestExchangeRates(base, date));        
        saveInLocalStorage(key, response);
        return response
    }
}

export async function getCurrencyConversion(object){
    let key = getCurrencyConversionKey(object);
    try{
        let response = getFromLocalStorage(key);
        if(response === null){
            throw new Error("This conversion rate hasn't been saved yet")
        }
        if(object.amount !== response.amount){
            return calculateConversion(object, response);
        }
        return response
    } catch(e){
        let response = await requestCurrencyConversion(object);
        let result = mapCurrencyConversion(response);
        saveInLocalStorage(key, result);
        return result
    }
}


