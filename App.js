import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AppContainer from './Route';
import { MainProvider } from './contexts/MainContext';

const App = () => {
  return (
    <MainProvider>
      <AppContainer />
    </MainProvider>
  );
};

export default App;
