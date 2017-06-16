const initialState = null;

export const login = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return action.email;
    case 'LOGOUT_USER':
      return null ;
    case 'LOG_IN_ERROR':
      return null;
    default:
      return state;
  }
}
