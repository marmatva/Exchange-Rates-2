import { ConversionRateResults, CurrencyList, ExchangeRates } from "./entities.js";

export function mapCurrencyList(apiData){
    let symbols = apiData.symbols;
    return new CurrencyList(symbols);  
}

export function mapExchangeRates(apiData){
    let mappedData = {};
    mappedData.base = apiData.base;
    mappedData.date = apiData.date;
    mappedData.rates = apiData.rates;

    return new ExchangeRates(mappedData)
}

export function mapCurrencyConversion(apiData){
    let mappedData = {};
    mappedData.date = apiData.date;
    mappedData.from = apiData.query.from;
    mappedData.to = apiData.query.to;
    mappedData.rate = apiData.info.rate;
    mappedData.amount = apiData.query.amount;
    mappedData.result = apiData.result;

    return new ConversionRateResults(mappedData);
}