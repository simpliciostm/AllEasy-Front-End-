export const setLocalStorage = (key: string, value: string) => {
    window.localStorage.setItem(key, value);
}

export const clearStorage = () => {
    window.localStorage.clear();
}