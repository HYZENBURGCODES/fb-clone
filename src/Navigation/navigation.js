import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';

import HomePage from '../screens/HomePage';

const Stack= createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        initialRouteName= 'HomePage'>
            <Stack.Screen name='HomePage' component={HomePage}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}
