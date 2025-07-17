export const setLocalStorage = (key: string, value: string) => {
    window.localStorage.setItem(key, value);
}

export const clearStorage = () => {
    window.localStorage.clear();
}

export const getStorage = (key: string) => {
    const itemStorage = window.localStorage.getItem(key)

    if (itemStorage && typeof itemStorage == 'string') return itemStorage
}