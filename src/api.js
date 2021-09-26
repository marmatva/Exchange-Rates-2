import { showWarning, createSelectCurrenciesOptions } from "./menuui.js";
import { CurrencyList } from "./entities.js";

export function requestSupportedSymbols(){
    let requestURL = 'https://api.exchangerate.host/symbols';
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        let response = new CurrencyList(request.response.symbols);
        createSelectCurrenciesOptions(response);
    }

    request.onerror = showWarning; //DEFINIR FUNCION
}

export function requestExchangeRates(base, date){
    let requestURL = `https://api.exchangerate.host/${date}?base=${base}`;
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        let response = request.response;
        console.log(response);
    }
}

export function requestCurrencyConversion(object){
    let requestURL = `https://api.exchangerate.host/convert?from=${object.from}&to=${object.to}&amount=${object.amount}`;
    if(object.date){
        requestURL += `&date=${object.date}`
    }
    
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
    let response = request.response;
    console.log(response);
    }
}

