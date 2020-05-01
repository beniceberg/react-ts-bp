import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { reducer, history } from './reducers';

interface CustomWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}
const customWindow = window as CustomWindow;

const middleware = [thunk, routerMiddleware(history)];

const composeEnhancers =
  customWindow && customWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? customWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  // other store enhancers if any
);

export const store = createStore(reducer, {}, enhancer);
