import {removeInvalidStyle, showInvalidInput} from './menuui.js'
import {allowDisplayResults} from './ratesui.js'
import{requestExchangeRates, requestCurrencyConversion} from './formRequests.js'

let invalidInputValues = {
    select: value => value==="N/A",
    number: value => (value==="0" || value==="" || value===" "),
    date: () => false,
    selectError: "Currency selection cannot be empty",
    numberError: "Please select a number greater than 0",
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

function validateInput(input){
    let key = (input.tagName === "INPUT") ? input.type : input.tagName.toLowerCase();
    if(invalidInputValues[key](input.value)){
        let inputObject = {};
        inputObject.element = input;
        inputObject.error = invalidInputValues[`${key}Error`]
        return inputObject;
    }
}

export function reviewInputChange(e){
    let input = e.target;
    let inputObject = validateInput(input)
    if(inputObject){
        showInvalidInput(inputObject)
        return;
    }
    removeInvalidStyle(input);
}

