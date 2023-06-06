import * as React from 'react';
import Nav from './Navigation/index';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '../src/Redux/store';
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Nav />
      </PersistGate>
    </Provider>
  );
}
