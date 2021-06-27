import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons'; 

import Home from './src/Home';
import Details from './src/Details.js';
import Match from './src/Match.js';

const Stack = createStackNavigator();
const debug = 0;

function App() {
  if (debug) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Match">
          <Stack.Screen name="Match" component={Match} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Match History" component={Home} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Match" component={Match} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
