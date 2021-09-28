import {manageTabSelection, prepareSelectOptions,establishMaxDateOnInputs, manageRequestSubmitted} from './menuui.js'

document.querySelector('.rate-options-tabs').addEventListener('click', manageTabSelection);
document.querySelector('#request-exchange-rate').addEventListener('click', manageRequestSubmitted);
document.querySelector('#request-convert-currency').addEventListener('click', manageRequestSubmitted);

prepareSelectOptions();
establishMaxDateOnInputs();