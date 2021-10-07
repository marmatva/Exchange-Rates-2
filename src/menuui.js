import {allowDisplayResults, removePreviousResults} from './ratesui.js'
import {getSupportedSymbols} from './service.js'
import { getTodaysDate } from './utilities.js'
import {reviewInputChange} from './form.js'

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

export function showInvalidInput(object){
    let element = object.element;
    if(element.classList.contains('invalid-input')){
        return;
    }
    element.classList.add('invalid-input');
    element.onchange=reviewInputChange;
    let error = document.createElement('p');
    error.classList.add('invalid-input-message');
    error.appendChild(document.createTextNode(object.error));
    element.parentElement.appendChild(error); 
}

export function removeInvalidStyle(input){
    input.classList.remove('invalid-input');
    input.parentElement.querySelector('.invalid-input-message').remove();
}

export function prepareToDisplayResponse(menu){
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