import { combineReducers, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware, routerReducer } from '../router/router';
import { sagaMiddleware } from './sagas/saga';
import authReducer from './reducers/authReducer';

import appConfig from '../appConfig';
import { identity } from 'lodash';

const configureStore = (initialState = {}) => {
  const rootReducer = combineReducers({
    router: routerReducer,
    auth: authReducer
  });

  // Create the store
  const compose = appConfig.enableReduxDevTools ? composeWithDevTools : identity;

  return createStore(rootReducer, initialState, compose(applyMiddleware(sagaMiddleware, routerMiddleware)));
};

export { configureStore };
