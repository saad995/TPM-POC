export function randomNumberGenerator () {
    const arr = new Uint32Array(1);
    const newRandomNumber = window.crypto.getRandomValues(arr).toString()
    return newRandomNumber 
}