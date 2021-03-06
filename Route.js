import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { MainContext } from './contexts/MainContext';

import Home from './Pages/Home';
import Upload from './Pages/Upload';
import Profile from './Pages/Profile';
import Login from './Pages/Login';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

function MyStack() {
  const { isLoggedIn } = useContext(MainContext);
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name='Home'
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Upload'
              component={Upload}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Profile'
              component={Profile}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <Stack.Screen
            name='Login'
            component={Login}
            options={() => ({
              headerShown: false,
            })}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;