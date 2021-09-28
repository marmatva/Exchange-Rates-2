export function saveInLocalStorage(key, value){
    let item = JSON.stringify(value)
    localStorage.setItem(key, item);
}

export function getFromLocalStorage(key){
    let item = localStorage.getItem(key)
    return JSON.parse(item);
}