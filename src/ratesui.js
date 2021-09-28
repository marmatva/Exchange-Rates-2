import {removeLoadingMessage} from './menuui.js'
import { getTodaysDate } from './utilities.js';
let displayResultsAllowed = true;

export function allowDisplayResults(x=true){
    displayResultsAllowed = x;
}

export function displayApiResponse(data, callback){
    removeLoadingMessage();
    if(displayResultsAllowed){
        callback(data);
    }
}

function createRateCard(base, symbol, rate){
    let card = document.createElement('ARTICLE');
    card.classList.add('exchange-rate-card');

    let heading = document.createElement('H4');
    heading.appendChild(document.createTextNode(symbol));
    heading.classList.add('exchange-rate-heading');

    let equivalence = document.createElement('P');
    equivalence.appendChild(document.createTextNode(`1 ${base} =`));
    equivalence.classList.add('exchange-rate-equivalence');
    let amount = document.createElement('SPAN');
    amount.appendChild(document.createTextNode(`${rate} ${symbol}`));
    equivalence.appendChild(amount);
    card.appendChild(heading);
    card.appendChild(equivalence);

    return card;

}

export function displayExchangeRates(data){
    let base = data.base;
    let date = data.date;

    let rates = data.rates;
    let container = document.createElement('SECTION');
    container.classList.add('exchange-rates-container');
    container.classList.add('results-display');

    let heading = document.createElement('H3');
    heading.appendChild(document.createTextNode('Currencies Rates'))
    let subheading = document.createElement('H4');
    subheading.appendChild(document.createTextNode(`Currencies equivalence with base ${base} on ${date}`));
    let headingsContainer = document.createElement('DIV');
    headingsContainer.appendChild(heading);
    headingsContainer.appendChild(subheading);
    headingsContainer.classList.add('rates-result-heading-container')
    container.append(headingsContainer);

    Object.keys(rates).forEach( key=>{
        let card = createRateCard(base, key, rates[key]);
        container.appendChild(card);
    })

    document.querySelector('main main').classList.add('bigger-width');
    document.querySelector('main main').appendChild(container);
}

export function displayRateConversion(data){
    let {date, from: fromSymbol, to: toSymbol, amount: fromAmount, result: toAmount, rate } = data;

    let container = document.createElement('ARTICLE');
    container.classList.add('results-display');
    let heading = document.createElement('H3');
    heading.appendChild(document.createTextNode('Conversion Rate'))

    let conversionDetail = document.createElement('P');
    if(date === getTodaysDate()){
        conversionDetail.appendChild(document.createTextNode(`${fromAmount} ${fromSymbol} is equivalent to`));
    } else{
        conversionDetail.appendChild(document.createTextNode(`On ${date}, ${fromAmount} ${fromSymbol} where equivalent to`));
    }
    
    let conversionResult = document.createElement('SPAN');
    conversionResult.appendChild(document.createTextNode(`${toAmount} ${toSymbol}`));
    conversionDetail.appendChild(conversionResult);

    let conversionRate = document.createElement('P');
    conversionRate.appendChild(document.createTextNode(`1 ${fromSymbol} = ${rate} ${toSymbol}`));

    container.appendChild(heading);
    container.appendChild(conversionDetail);
    container.appendChild(conversionRate);

    document.querySelector('main main').appendChild(container);
}

export function removePreviousResults(){
    let results = document.querySelector('.results-display');
    if(results){
        results.remove();
    }

    if(document.querySelector('.bigger-width')){
        document.querySelector('.bigger-width').classList.remove('bigger-width');
    }
}