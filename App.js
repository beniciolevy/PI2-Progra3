import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import HomeMenu from './src/components/homeMenu';

const Stack = createNativeStackNavigator();


export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator>

      
          <Stack.Screen name="HomeMenu" component={HomeMenu} />
          
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          
        

      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
