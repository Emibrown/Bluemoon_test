import React from 'react';
import StackNavigator from './src/navigation/StackNavigator';
import { Provider as StoreProvider } from 'react-redux'
import store from './src/stores/configureStore';




const App  = () => {

  return (
    <StoreProvider store={store}>
      <StackNavigator/>
    </StoreProvider>
  );

};


export default App;
