import {manageTabSelection, prepareSelectOptions,establishMaxDateOnInputs} from './menuui.js'
import {manageRequestSubmitted, requestExchangeRates, requestCurrencyConversion} from './form.js'

function startApp(){
    document.querySelector('.rate-options-tabs').addEventListener('click', manageTabSelection);
    document.querySelector('#request-exchange-rate').addEventListener('click', manageRequestSubmitted);
    document.querySelector('#request-convert-currency').addEventListener('click', manageRequestSubmitted);
    prepareSelectOptions();
    establishMaxDateOnInputs();
}

startApp();