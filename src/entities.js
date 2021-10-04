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

export class ExchangeRates{
    constructor(data){
        this.base = data.base;
        this.date = data.date;
        this.rates = data.rates;
    }
}

export class ConversionRateResults{
    constructor(data){
        this.date = data.date;
        this.from = data.from;
        this.to = data.to;
        this.rate = data.rate;
        this.amount = data.amount;
        this.result = data.result;
    }
}