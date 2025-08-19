// import { encrypt, decrypt } from "./encryption";
// import { saveToSession, getFromSession, clearFromSession } from "./storage";

// const TOKEN_KEY = "jwtToken";

// export const saveToken = (token) => {
//   const encrypted = encrypt(token);
//   saveToSession(TOKEN_KEY, encrypted);
// };

// export const getToken = () => {
//   const encrypted = getFromSession(TOKEN_KEY);
//   if (!encrypted) return null;

//   try {
//     return decrypt(encrypted);
//   } catch {
//     return null;
//   }
// };

// export const clearToken = () => {
//   clearFromSession(TOKEN_KEY);
// };


import { encrypt, decrypt } from "./encryption";
import { saveToSession, getFromSession, clearFromSession } from "./storage";

const TOKEN_KEY = "jwtToken";
const EXPIRATION_KEY = "tokenExpiration";
let expirationTimer = null;

// Decode JWT payload to get expiration time
const getTokenExpiration = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000; // Convert to milliseconds
  } catch (e) {
    return Date.now() + 3600000; // Default 1 hour
  }
};

// Set timer for token expiration
const setExpirationTimer = (expirationTime) => {
  clearTimer();
  const timeLeft = expirationTime - Date.now();
  
  if (timeLeft > 0) {
    expirationTimer = setTimeout(() => {
      if (getFromSession(TOKEN_KEY)) {
        clearToken();
        window.location.href = '/login'; // Redirect to login page
      }
    }, timeLeft);
  }
};

const clearTimer = () => {
  if (expirationTimer) {
    clearTimeout(expirationTimer);
    expirationTimer = null;
  }
};

export const saveToken = (token) => {
  const encrypted = encrypt(token);
  saveToSession(TOKEN_KEY, encrypted);
  
  const expiration = getTokenExpiration(token);
  saveToSession(EXPIRATION_KEY, expiration.toString());
  setExpirationTimer(expiration);
};

export const getToken = () => {
  const encrypted = getFromSession(TOKEN_KEY);
  if (!encrypted) return null;

  try {
    return decrypt(encrypted); // Return decrypted token
  } catch {
    return null;
  }
};


export const checkToken = () => {
  const encrypted = getFromSession(TOKEN_KEY);
  if (!encrypted) return null;

  try {
    return decrypt(encrypted); // Return decrypted token
  } catch {
    return null;
  }
};



export const clearToken = () => {
  clearFromSession(TOKEN_KEY);
  clearFromSession(EXPIRATION_KEY);
  clearTimer();
};

// Initialize expiration timer on app load
(() => {
  const expiration = getFromSession(EXPIRATION_KEY);
  if (expiration) {
    const expirationTime = parseInt(expiration, 10);
    if (expirationTime > Date.now()) {
      setExpirationTimer(expirationTime);
    } else {
      clearToken(); // Clear expired token
    }
  }
})();