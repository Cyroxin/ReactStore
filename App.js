import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AppContainer from './Route';
import PageNavigator from './Navigators/PageNavigation';
import { MainProvider } from './contexts/MainContext';

const App = () => {
  return (
    <MainProvider>
      <PageNavigator />
    </MainProvider>
  );
};

export default App;
