export function calculateConversion(object, response){
    let amount = object.amount;
    response.amount = amount;
    response.result = amount * response.rate;
    return response
}
export function getTodaysDate(){
    let today = new Date()
    let date = today.toISOString().split('T')[0];
    return date
}