import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AppContainer from './Route';

const App = () =>
{
    return (
      <NavigationContainer>
        <AppContainer />
    </NavigationContainer>
    );
};

export default App;
