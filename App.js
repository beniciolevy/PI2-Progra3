import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import HomeMenu from './src/components/homeMenu';
import { auth } from './src/firebase/config';

const Stack = createNativeStackNavigator();

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    return (
      <NavigationContainer>
        
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          { this.state.user ? (
            <Stack.Screen name="HomeMenu" component={HomeMenu} />
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
