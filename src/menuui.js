import {ConversionRequestParameters} from './entities.js'
import {allowDisplayResults, removePreviousResults} from './ratesui.js'
import {getCurrencyConversion, getExchangeRates, getSupportedSymbols} from './service.js'
import {displayApiResponse, displayRateConversion, displayExchangeRates} from './ratesui.js'
import { getTodaysDate } from './utilities.js'

export function establishMaxDateOnInputs(){
    let dateInputs = document.querySelectorAll('input[type="date"]');
    let today = getTodaysDate()
    dateInputs.forEach(input => input.max = today)
}

export async function prepareSelectOptions(){
    let supportedSymbols = await getSupportedSymbols();
    createSelectCurrenciesOptions(supportedSymbols)
}

function createSelectCurrenciesOptions(supportedCurrencies){
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
    allowDisplayResults(false);

    let id = e.target.id;
    
    if(e.target.tagName !== "H2" || !document.querySelector(`.${id}-menu`).classList.contains('display-none')){
        return;
    }

    if(!e.target.classList.contains('active-tab')){
        hidePreviousTabSelection();
    }

    removePreviousResults();
    removeLoadingMessage();
    displayTabSelection(e.target);
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

export function manageRequestSubmitted(e){
    e.preventDefault();
    allowDisplayResults();
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
    if(element.classList.contains('invalid-input')){
        return;
    }
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
    input.parentElement.querySelector('.invalid-input-message').remove();
}

async function requestExchangeRates(form){
    let base = form['exchange-rates-currency'].value;
    let date = form['exchange-rate-date'].value;
    if(!date){
        date = "latest"
    }

    prepareToDisplayResponse(form.parentElement);
    let response = await getExchangeRates(base, date);
    displayApiResponse(response, displayExchangeRates);
}

async function requestCurrencyConversion(form){
    let amount = form['convert-currency-amount'].value;
    let from = form['convert-currency-from'].value;
    let to = form['convert-currency-to'].value;

    let date = form['convert-currency-date'].value;

    let requestParameters = new ConversionRequestParameters(from, to, amount);

    if(date){requestParameters.date = date}

    prepareToDisplayResponse(form.parentElement);
    let response = await getCurrencyConversion(requestParameters);
    displayApiResponse(response, displayRateConversion);
}

function prepareToDisplayResponse(menu){
    menu.classList.add('display-none');
    displayLoadingMessage();
}

function displayLoadingMessage(){
    let container = document.createElement('SECTION');
    container.classList.add('loading-container')
    let wheel = document.createElement('DIV');
    wheel.classList.add('loading-wheel');
    let message = document.createElement('P');
    message.classList.add('loading-message')
    message.appendChild(document.createTextNode('Loading Results'));
    container.appendChild(message);
    container.appendChild(wheel);
    document.querySelector('main main').appendChild(container);
}

export function removeLoadingMessage(){
    if(document.querySelector('.loading-container')){
        document.querySelector('.loading-container').remove();
    }
}