import {displayApiResponse, displayRateConversion, displayExchangeRates} from './ratesui.js'
import {ConversionRateResults} from './entities.js'

// export function requestSupportedSymbols(){
//     let requestURL = 'https://api.exchangerate.host/symbols';
//     let request = new XMLHttpRequest();
//     request.open('GET', requestURL);
//     request.responseType = 'json';
//     request.send();

//     request.onload = function() {
//         let response = new CurrencyList(request.response.symbols);
//         createSelectCurrenciesOptions(response);
//     }

//     request.onerror = showWarning; //DEFINIR FUNCION
// }

// export function requestExchangeRates(base, date){
//     let requestURL = `https://api.exchangerate.host/${date}?base=${base}&places=4`;
//     let request = new XMLHttpRequest();
//     request.open('GET', requestURL);
//     request.responseType = 'json';
//     request.send();

//     request.onload = function() {
//         let response = new ExchangeRates(request.response);
//         saveInLocalStorage(response);
//         displayApiResponse(response, displayExchangeRates);
//     }
// }

export function requestExchangeRates(base, date){
    let requestURL = `https://api.exchangerate.host/${date}?base=${base}&places=4`;
    return fetch(requestURL)
            .then(r=>r.json())
            .catch(e => console.log(e));
}

export function requestSupportedSymbols(){
    let requestURL = 'https://api.exchangerate.host/symbols';
    return fetch(requestURL)
        .then(r=>r.json())
        .catch(e=>console.log(e))
}

export function requestCurrencyConversion(object){
    let requestURL = `https://api.exchangerate.host/convert?from=${object.from}&to=${object.to}&amount=${object.amount}`;
    if(object.date){
        requestURL += `&date=${object.date}`
    }

    return fetch(requestURL)
        .then(r=>r.json())
        .catch(e=>console.log(e))
}

// export function requestCurrencyConversion(object){
//     let requestURL = `https://api.exchangerate.host/convert?from=${object.from}&to=${object.to}&amount=${object.amount}`;

    
//     let request = new XMLHttpRequest();
//     request.open('GET', requestURL);
//     request.responseType = 'json';
//     request.send();

//     request.onload = function() {
//         let response = request.response;
//         console.log(response)
//         console.log(new ConversionRateResults(response));
//         displayApiResponse(response, displayRateConversion);
//     }
// }