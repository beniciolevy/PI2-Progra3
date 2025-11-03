import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Login from '../screens/Login';
import Register from '../screens/Register';

const Tab = createBottomTabNavigator();

export default function HomeMenu() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} options={ { tabBarIcon: () => <FontAwesome5 name="warehouse" size={24} color="black" /> }} />
      <Tab.Screen name="Login" component={Login} options={ { tabBarIcon: () => <FontAwesome5 name="warehouse" size={24} color="black" /> }} />
      <Tab.Screen name="Register" component={Register} options={ { tabBarIcon: () => <FontAwesome5 name="warehouse" size={24} color="black" /> }} />
    </Tab.Navigator>
  );
}


