import {manageTabSelection, establishMaxDateOnInputs, manageRequestSubmitted} from './menuui.js'
import {requestSupportedSymbols} from './api.js'

document.querySelector('.rate-options-tabs').addEventListener('click', manageTabSelection);
document.querySelector('#request-exchange-rate').addEventListener('click', manageRequestSubmitted);
document.querySelector('#request-convert-currency').addEventListener('click', manageRequestSubmitted);

requestSupportedSymbols();
establishMaxDateOnInputs();