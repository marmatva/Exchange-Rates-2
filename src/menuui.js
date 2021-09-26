import {requestExchangeRates as requestExchangeRatesFromApi, requestCurrencyConversion as requestCurrencyConversionFromApi} from './api.js'
import {ConversionRequestParameters} from './entities.js'

export function establishMaxDateOnInputs(){
    let dateInputs = document.querySelectorAll('input[type="date"]');
    let todayDate= new Date();
    let todayFormat = todayDate.toISOString().split('T')[0];
    dateInputs.forEach(input => input.max = todayFormat)
}

export function createSelectCurrenciesOptions(supportedCurrencies){
    let keys = Object.keys(supportedCurrencies);
    let options = []
    keys.forEach(key => {
        let option = createOption(supportedCurrencies[key]);
        options.push(option);
    })
    incorporateOptionsToSelect(options);
}

function createOption(object){
    let option = document.createElement('OPTION');
    option.value = object.code;
    option.appendChild(document.createTextNode(`${object.code} - ${object.description}`));
    return option
}

function incorporateOptionsToSelect(optionsArray){
    let currenciesSelectors = document.querySelectorAll('.currencies-selector');
    let selectorsLength = currenciesSelectors.length;
    optionsArray.forEach(option => {
        for(let i=selectorsLength-1;i>=0;i--){
            currenciesSelectors[i].appendChild(option.cloneNode(true))
        }
    });
}

export function manageTabSelection(e){
    if(e.target.tagName !== "H2" || e.target.classList.contains('active-tab')){
        return;
    }
    hidePreviousTabSelection();
    displayTabSelection(e.target)
}


function hidePreviousTabSelection(){
    let activeTab = document.querySelector('.tab-option-rate.active-tab');
    let selectorId = activeTab.id;
    let section = document.querySelector(`.${selectorId}-menu`);
    activeTab.classList.remove('active-tab');
    section.classList.add('display-none');
}

function displayTabSelection(tab){
    let selectorId = tab.id;
    let requiredSection = document.querySelector(`.${selectorId}-menu`);
    tab.classList.add('active-tab');
    requiredSection.classList.remove('display-none');
}

export function showWarning(message){
    alert(message);
}

export function manageRequestSubmitted(e){
    e.preventDefault();
    let form = e.target.parentElement;
    let invalidInputs = validateForm(form);
    let keys = Object.keys(invalidInputs);
    if(keys.length!==0){
        keys.forEach(key => showInvalidInput(invalidInputs[key]))
        return;
    }
    if(form.name ==="exchange-rate-form"){
        requestExchangeRates(form)
    } else {requestCurrencyConversion(form)}

}

let invalidInputValues = {
    select: value => value==="N/A",
    number: value => (value==="0" || value===""),
    date: () => false,
    selectError: "Currency selection cannot be empty",
    numberError: "Please select a number greater than 0",
}

function validateForm(form){
    let inputs = form.elements;
    let invalidInputs = {};
    let nonSubmitInputsLength = inputs.length-1;
    for(let i=0;i<nonSubmitInputsLength;i++){
        let invalidInput = validateInput(inputs[i]);
        if(invalidInput){
            invalidInputs[`element${i}`] = invalidInput;
        }
    }
    return invalidInputs;
}

function showInvalidInput(object){
    let element = object.element;
    element.classList.add('invalid-input');
    element.addEventListener('change', reviewInputChange);
    let error = document.createElement('p');
    error.classList.add('invalid-input-message');
    error.appendChild(document.createTextNode(object.error));
    element.parentElement.appendChild(error); 
}

function validateInput(input){
    let key = (input.tagName === "INPUT") ? input.type : input.tagName.toLowerCase();
    if(invalidInputValues[key](input.value)){
        let inputObject = {};
        inputObject.element = input;
        inputObject.error = invalidInputValues[`${key}Error`]
        return inputObject;
    }
}

function reviewInputChange(e){
    let input = e.target;
    if(validateInput(input)){
        return;
    }
    removeInvalidStyle(input);
}

function removeInvalidStyle(input){
    input.classList.remove('invalid-input');
    input.parentElement.querySelector('p').remove();
}

function requestExchangeRates(form){
    let base = form['exchange-rates-currency'].value;
    let date = form['exchange-rate-date'].value;
    if(!date){
        date = "latest"
    }

    requestExchangeRatesFromApi(base, date);

}

function requestCurrencyConversion(form){
    let amount = form['convert-currency-amount'].value;
    let from = form['convert-currency-from'].value;
    let to = form['convert-currency-to'].value;

    let date = form['convert-currency-date'].value;

    let requestParameters = new ConversionRequestParameters(from, to, amount);

    if(date){requestParameters.date = date}

    requestCurrencyConversionFromApi(requestParameters);

}