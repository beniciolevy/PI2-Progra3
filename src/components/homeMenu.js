import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import NewPost from '../screens/NewPost';
import Profile from '../screens/Profile';
import Comments from '../screens/Comments';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Comments" component={Comments} />
    </Stack.Navigator>
  );
}

export default function HomeMenu() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeTab" component={HomeStack} options={{ tabBarIcon: () => <FontAwesome5 name="home" size={24} /> }} />
      <Tab.Screen name="NewPost" component={NewPost} options={{ tabBarIcon: () => <FontAwesome5 name="plus" size={24} /> }} />
      <Tab.Screen name="Profile" component={Profile} options={{ tabBarIcon: () => <FontAwesome5 name="user" size={24} /> }} />
    </Tab.Navigator>
  );
}
