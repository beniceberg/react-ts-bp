import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';

import { ReducerType } from './reducerTypes';

export const history: History = createBrowserHistory();

export const reducer = combineReducers<ReducerType>({
  router: connectRouter(history),
});
