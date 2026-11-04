// one place for every backend call
const BASE_URL = '/api';
const TOKEN_KEY = 'stockflow_token';
const USER_KEY = 'stockflow_user';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function saveSession(token, user) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export async function apiRequest(path, options = {}) {
  const token = getToken();

  const response = await fetch(BASE_URL + path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
      ...(options.headers || {}),
    },
  });

  let data = null;
  try {
    data = await response.json();
  } catch (err) {
    data = null;
  }

  if (!response.ok) {
    // expired token means the user has to log in again
    if (response.status === 401) {
      clearSession();
      if (window.location.pathname !== '/login') {
        window.location.assign('/login');
      }
    }
    throw new Error((data && data.message) || 'request failed (' + response.status + ')');
  }

  return data;
}

export function apiGet(path) {
  return apiRequest(path, { method: 'GET' });
}

export function apiPost(path, body) {
  return apiRequest(path, { method: 'POST', body: JSON.stringify(body) });
}

export function apiPut(path, body) {
  return apiRequest(path, { method: 'PUT', body: JSON.stringify(body) });
}

export function apiDelete(path) {
  return apiRequest(path, { method: 'DELETE' });
}
