// AppNavigator.js

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import StartScreen from './StartScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import HomeScreen from './HomeScreen';
import Square1Screen from './Square1Screen';
import Square2Screen from './Square2Screen';
import Square3Screen from './Square3Screen';
import Square4Screen from './Square4Screen';
import ProfileScreen from './ProfileScreen';
import AddRoom from './AddRoom';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Square1Screen" component={Square1Screen} />
        <Stack.Screen name="Square2Screen" component={Square2Screen} />
        <Stack.Screen name="Square3Screen" component={Square3Screen} />
        <Stack.Screen name="Square4Screen" component={Square4Screen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="AddRoom" component={AddRoom} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
