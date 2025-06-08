// src/utils/tokenUtils.js

export const isTokenValid = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const [, payloadBase64] = token.split('.');
    const payload = JSON.parse(atob(payloadBase64));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp > now;
  } catch (err) {
    return false;
  }
};