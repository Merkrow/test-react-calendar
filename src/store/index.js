import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers/index';
import thunkMiddleware from 'redux-thunk';

const initialState = {
  events: [],
  login: null,
}

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

const store = createStoreWithMiddleware(rootReducer, initialState);

export default store;
