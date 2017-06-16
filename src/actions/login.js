let regeneratorRuntime =  require('regenerator-runtime');

const url = 'http://localhost:5000/';

export const signUp = (params) => async (dispatch) => {
  try {
    let response = await fetch(`${url}user`, { method: 'POST', headers: { 'Content-Type' : 'application/json' }, body: JSON.stringify(params) });
    let payload = await response.json();
    dispatch({ type: 'LOGIN_USER', email: params.email });
    let tokenResponse = await fetch(`${url}login`, { method: 'POST', headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify({ email: params.email, password: params.password })});
    let token = await tokenResponse.json();
    if (token.token) {
      localStorage.clear();
      localStorage.setItem('token', token.token);
    }
  } catch(error) {
    dispatch({ type: 'LOG_IN_ERROR' });
  }
}

export const signInByToken = (token) => async (dispatch) => {
  try {
    let response = await fetch(`${url}events`, { method: 'GET', headers: { 'Authorization' : token } });
    let payload = await response.json();
    dispatch({ type: 'LOGIN_USER', email: payload.email });
    dispatch({ type: 'SET_EVENTS', events: JSON.parse(payload.events) });
  } catch(error) {
    console.log(error);
  }
}

export const login = (params) => async (dispatch) => {
  try {
    let response = await fetch(`${url}login`, { method: 'POST', headers: { 'Content-Type' : 'application/json' }, body: JSON.stringify(params) });
    let payload = await response.json();
    dispatch({ type: 'LOGIN_USER', email: params.email });
    if (payload.token) {
      localStorage.clear();
      localStorage.setItem('token', payload.token);
    }
    dispatch({ type: 'SET_EVENTS', events: JSON.parse(payload.events) });
  } catch(error) {
    console.log(error);
  }
}

export const logout = () => ({
  type: 'LOGOUT_USER'
})

export const saveEvents = (params) => async (dispatch) => {
  try {
    params.events = JSON.stringify(params.events);
    let response = await fetch(`${url}events`, { method: 'POST', headers: { 'Content-Type' : 'application/json' }, body: JSON.stringify(params) });
    let payload = await response.json();
  } catch(error) {
    console.log(error);
  }
}
