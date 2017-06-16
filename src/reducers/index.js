import { combineReducers } from 'redux';
import { events } from './events';
import { login } from './login';

export const rootReducer = combineReducers({
  events,
  login,
});
