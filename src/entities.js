export class CurrencyList{
    constructor(object){
        let keys = Object.keys(object);
        keys.forEach(key =>{
            this[key] = object[key];
        })
    }
}

export class ConversionRequestParameters{
    constructor(from,to,amount){
        this.from = from;
        this.to = to;
        this.amount = amount; 
    }
}
