import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons'; 
import store from './store'
import { Provider } from 'react-redux'

import Home from './src/Home';
import Details from './src/Details.js';
import MatchSimple from './src/MatchSimple';
import MatchDetailed from './src/MatchDetailed';

const Stack = createStackNavigator();

const debug = 0;

function App() {
  if (debug) {
    return (
      <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Details">
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
    );
  }
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Match History" component={Home} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Match Detailed" component={MatchDetailed} />
        <Stack.Screen name="Match Simple" component={MatchSimple} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App;
