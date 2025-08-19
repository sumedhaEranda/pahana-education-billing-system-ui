export const saveToSession = (key, value) => {
    sessionStorage.setItem(key, value);
  };
  
  export const getFromSession = (key) => {
    return sessionStorage.getItem(key);
  };
  
  export const clearFromSession = (key) => {
    sessionStorage.removeItem(key);
  };