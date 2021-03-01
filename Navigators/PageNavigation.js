import React, { useContext } from 'react';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
// import { MainContext } from '../contexts/MainContext';
import { Icon } from 'native-base';

const Stack = createStackNavigator();
const isLoggedIn = false;
const StackScreen = () => {
  // const { isLoggedIn } = useContext(MainContext);
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name='Home'
            component={Home}
            options={({ route }) => ({
              headerTitle: getFocusedRouteNameFromRoute(route),
            })}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name='Login'
            component={Login}
            options={() => ({
              headerShown: false,
            })}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const PageNavigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default PageNavigator;
