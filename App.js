import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './Screens/WelcomeScreen';
import { AppDrawerNavigator } from './Components/AppDrawerNavigator'
import { AppTabNavigator } from './Components/AppTabNavigator'
import {createSwitchNavigator,createAppContainer} from 'react-navigation'

export default class App extends React.Component{
  render(){
    return (
       
         <AppContainer />
        
      );
  }   
}
const switchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen: WelcomeScreen},
  Drawer:{screen: AppDrawerNavigator},
  BottomTab: {screen: AppTabNavigator}
})

const AppContainer =  createAppContainer(switchNavigator);



