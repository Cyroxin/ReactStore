import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Pages/Home';
import Upload from './Pages/Upload';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
      <Stack.Screen name='Upload' component={Upload} options={{headerShown:false}} />
    </Stack.Navigator>
  );
}

export default MyStack;