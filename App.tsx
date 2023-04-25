import React from 'react';
import StackNavigator from './navigators/StackNavigator';
import SocketContextProvider from './contexts/socketContext';


function App(): JSX.Element {
  return (
  <SocketContextProvider>
    <StackNavigator/>
  </SocketContextProvider>
  );
}

export default App;
