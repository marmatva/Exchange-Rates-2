import { saveInLocalStorage, getFromLocalStorage } from "../storage.js";

describe('Test storage module', ()=>{

    beforeAll(()=>{
        jest.clearAllMocks();
        global.Storage.prototype.setItem=jest.fn();
        global.Storage.prototype.getItem=jest.fn((x)=>x);
        // global.localStorage={
        //     setItem: jest.fn(()=>{}),
        //     getItem: jest.fn(x=>x)
        // }
    });

    test('Test saving in local storage', ()=>{
        let objectExample = {a: 1, b: 2};
        let key = "exampleKey"

        saveInLocalStorage(key, objectExample);

        expect(global.Storage.prototype.setItem).toHaveBeenCalledTimes(1);
        expect(global.Storage.prototype.setItem).toHaveBeenLastCalledWith(key, "{\"a\":1,\"b\":2}");       
    })

    test('Test getting from local storage', ()=>{
        let key = "{\"a\":1,\"b\":2}";
        let result = getFromLocalStorage(key);

        expect(global.Storage.prototype.getItem).toHaveBeenCalledTimes(1);
        expect(global.Storage.prototype.getItem).toHaveBeenLastCalledWith(key);
        expect(result).toEqual({a: 1, b: 2});
    })

})