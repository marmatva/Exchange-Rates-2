import {prepareToDisplayResponse} from './menuui.js'
import {ConversionRequestParameters} from './entities.js'
import {displayApiResponse, displayRateConversion, displayExchangeRates} from './ratesui.js'
import {getCurrencyConversion, getExchangeRates} from './service.js'

export async function requestExchangeRates(form){
    let base = form.querySelector('#exchange-rates-currency').value;
    let date = form.querySelector('#exchange-rate-date').value;
    if(!date){
        date = "latest"
    }

    prepareToDisplayResponse(form.parentElement);
    let response = await getExchangeRates(base, date);
    displayApiResponse(response, displayExchangeRates);
}

export async function requestCurrencyConversion(form){
    let amount = form.querySelector('#convert-currency-amount').value;
    let from = form.querySelector('#convert-currency-from').value;
    let to = form.querySelector('#convert-currency-to').value;

    let date = form.querySelector('#convert-currency-date').value;

    let requestParameters = new ConversionRequestParameters(from, to, amount);

    if(date){requestParameters.date = date}

    prepareToDisplayResponse(form.parentElement);
    let response = await getCurrencyConversion(requestParameters);
    displayApiResponse(response, displayRateConversion);
}