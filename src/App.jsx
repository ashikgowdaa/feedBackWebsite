import './App.css'
import Router from './Router';
import { Provider } from 'react-redux';
import Store, { persistor } from './Redux/Store';
import { PersistGate } from 'redux-persist/integration/react';


function App() {

  return (
    <>
      <Provider store={Store}>
        <PersistGate persistor={persistor} loading={null}>
          <Router />
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
