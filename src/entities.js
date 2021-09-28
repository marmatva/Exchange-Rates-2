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
        this.from = data.query.from;
        this.to = data.query.to;
        this.rate = data.info.rate;
        this.amount = data.query.amount;
        this.result = data.result;
    }
}