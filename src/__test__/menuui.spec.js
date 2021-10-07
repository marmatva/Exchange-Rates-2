jest.mock('../utilities.js', ()=>({
    getTodaysDate: jest.fn(()=>"2021-10-05")
}))

jest.mock('../service.js', ()=>({
    getSupportedSymbols: jest.fn(()=>({
        USD:{
            description: "United States Dollar",
            code: "USD",
        },
        EUR:{
            description: "Euro",
            code: "EUR"
        }
    }))
}))

jest.mock('../ratesui.js', ()=>({
    allowDisplayResults: jest.fn(),
    removePreviousResults: jest.fn()
}))

jest.mock('../form.js',()=>({
    reviewInputChange: jest.fn()
}))

import fixture from './fixture.js'
import * as mockService from '../service.js'
import * as mockRatesUi from '../ratesui.js'
import * as mockForm from '../form.js'
import {establishMaxDateOnInputs, manageTabSelection, prepareSelectOptions, prepareToDisplayResponse, removeInvalidStyle, removeLoadingMessage, showInvalidInput } from '../menuui.js'

describe('Test functions from menu ui module', ()=>{

    beforeEach(()=>{
        jest.clearAllMocks();
        document.body.innerHTML = fixture;
    })

    test('Test determinining max dates on inputs', ()=>{
        establishMaxDateOnInputs();
        let dateInputs = document.querySelectorAll('input[type="date"]');
        dateInputs.forEach(input => expect(input.max).toEqual("2021-10-05"))
    })

    test('Test ading the supported symbols as options on selects', async ()=>{
        await prepareSelectOptions();
        
        expect(mockService.getSupportedSymbols).toHaveBeenCalledTimes(1);

        let currenciesSelectors = document.querySelectorAll('select');
        currenciesSelectors.forEach(select =>{
            let options = select.querySelectorAll('option');
            expect(options[0].disabled).toBe(true);
            expect(options[1].value).toEqual("USD")
            expect(options[1].textContent).toEqual("USD - United States Dollar")
            expect(options[2].value).toEqual("EUR")
            expect(options[2].textContent).toEqual("EUR - Euro")
        })
    })

    test('Test function that manages tab selection', ()=>{
        let firstObject = {
            target:{
                id: "exchange-rate",
                tagName: "H2"
            }
        }
        manageTabSelection(firstObject);

        expect(mockRatesUi.allowDisplayResults).toHaveBeenCalledTimes(1);
        expect(mockRatesUi.allowDisplayResults).toHaveBeenLastCalledWith(false);
        expect(mockRatesUi.removePreviousResults).not.toHaveBeenCalled();
        
        firstObject.target.id = "convert-currency";
        firstObject.target.tagName="test";

        manageTabSelection(firstObject);

        expect(mockRatesUi.allowDisplayResults).toHaveBeenCalledTimes(2);
        expect(mockRatesUi.allowDisplayResults).toHaveBeenLastCalledWith(false);
        expect(mockRatesUi.removePreviousResults).not.toHaveBeenCalled();
        
        
        document.body.innerHTML += '<div class="loading-container">';
        expect(document.querySelector('.loading-container')).not.toBeNull();
        
        firstObject.target=document.querySelector("#convert-currency");
        
        manageTabSelection(firstObject);

        expect(document.querySelector('.convert-currency-menu').className).not.toContain('display-none');
        expect(document.querySelector('#convert-currency').className).toContain('active-tab');
        expect(document.querySelector('.exchange-rate-menu').className).toContain('display-none')
        expect(document.querySelector('#exchange-rate').className).not.toContain('active-tab');

        expect(mockRatesUi.removePreviousResults).toHaveBeenCalledTimes(1);
        expect(document.querySelector('.loading-container')).toBeNull();
    })

    /*
    test('Test function that manages submition', ()=>{
        let testObjetc = {
            preventDefault: jest.fn(),
            target:{
                parentElement:{
                    name: "name"
                }
            }
        }

        mockForm.validateForm
            .mockImplementationOnce(()=>({}))

        manageRequestSubmitted(testObject)
        expect(testObjetc.preventDefault).toHaveBeenCalledTimes(1);
        expect(mockRatesUi.allowDisplayResults).toHaveBeenCalledTimes(1);

        
    })
    */

    test('Test giving and removing styles from invalid inputs', ()=>{
        document.body.innerHTML += `<div id= "invalid-input" class="invalid-input"><div>
                                    <div ="test-object-parent">
                                        <div id="test-object"></div>
                                    </div>`;
        let firstObject={element: document.querySelector('#invalid-input')}
        showInvalidInput(firstObject);
        let changeEvent = new Event('change')
        document.querySelector('#invalid-input').dispatchEvent(changeEvent);
        expect(mockForm.reviewInputChange).toHaveBeenCalledTimes(0);
    
        let secondObject={
            element: document.querySelector('#test-object'),
            error: "testError"
        }
        showInvalidInput(secondObject)
        expect(secondObject.element.className).toContain('invalid-input')
        expect(secondObject.element.parentElement.querySelector('p').textContent).toContain(secondObject.error)
        expect(secondObject.element.parentElement.querySelector('p').className).toContain('invalid-input-message')
        secondObject.element.dispatchEvent(changeEvent);
        expect(mockForm.reviewInputChange).toHaveBeenCalledTimes(1);      
    
        removeInvalidStyle(secondObject.element);
        expect(secondObject.element.className).not.toContain('invalid-input');
        expect(secondObject.element.parentElement.querySelector('p')).toBeNull();
    })

    test('Test preparation to diplay responses', ()=>{
        prepareToDisplayResponse(document.querySelector('.exchange-rate-menu'))
        expect(document.querySelector('.exchange-rate-menu').className).toContain('display-none');
        
        let section = document.querySelector('section.loading-container')
        expect(section).not.toBeNull()
        expect(section.querySelector('DIV').className).toContain('loading-wheel');
        expect(section.querySelector('P').className).toContain('loading-message');
        expect(section.querySelector('P').textContent).toEqual('Loading Results');
        expect(section.parentElement).toEqual(document.querySelector('main main'));
    
        removeLoadingMessage();
        expect(document.querySelector('section.loading-container')).toBeNull();    
    })
})