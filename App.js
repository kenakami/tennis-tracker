import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons'; 

import Home from './src/Home';
import Details from './src/Details.js';

const Stack = createStackNavigator();
const debug = 0

function App() {
  if (debug) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Match Details">
          <Stack.Screen name="Match Details" component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Match History" 
          component={Home}
          options = {{
            headerRight: () => (
              <TouchableOpacity>
                 <AntDesign name="plus" size={21} color= "black"/>
              </TouchableOpacity>
            ),
            headerRightContainerStyle: {marginRight:'4%'}
           }} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
