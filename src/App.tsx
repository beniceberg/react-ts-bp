import React from 'react';
import { Store } from 'redux';
import { History } from 'history';
import { Provider as StoreProvider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';
import Routes from './pages';

type AppProps = {
  store: Store;
  history: History;
};

const App = ({ store, history }: AppProps) => (
  <StoreProvider store={store}>
    <ConnectedRouter history={history}>
      <Route component={Routes} />
    </ConnectedRouter>
  </StoreProvider>
);

export default App;
