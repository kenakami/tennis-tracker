import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './store'
import { Provider } from 'react-redux'


import Home from './src/Home';
import Details from './src/Details.js';
import MatchSimple from './src/MatchSimple';
import MatchDetailed from './src/MatchDetailed';
import Login from './src/Login';
import Signup from './src/Signup';
import Dashboard from './src/Dashboard';
import { DrawerContent } from './DrawerContent';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem,} from '@react-navigation/drawer';

import firebase from './database/firebase';

const Stack = createStackNavigator();

const debug = 0;

const Drawer = createDrawerNavigator();

function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Match History" component={Home} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Match Detailed" component={MatchDetailed} />
      <Stack.Screen name="Match Simple" component={MatchSimple} />
      <Stack.Screen name = "Signup" component = {Signup} options = {{title: 'Sign up'}}/>
      <Stack.Screen name = "Login" component = {Login} options = {{title: "Log in "}}/>
      <Stack.Screen name = "Dashboard" component = {Dashboard} />
    </Stack.Navigator>
  )
}

function App() {
  const [start, setStart] = useState('Login');
  firebase.auth().onAuthStateChanged((user) => {
    console.log(user)
    if (user) {
      setStart('Match History')
    }
  });

  if (debug) {
    return (
      <Provider store={start}>
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
      <Drawer.Navigator initialRouteName='Match History' drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name = "Match History" component={HomeScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App;
