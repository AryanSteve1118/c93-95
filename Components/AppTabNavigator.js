import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AppStackNavigator } from './AppStackNavigator'
import RequestScreen from '../Screens/RequestScreen';
import GiftScreen from '../Screens/GiftScreen'

export const AppTabNavigator = createBottomTabNavigator({
    GiftList : {
    screen: AppStackNavigator,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/request-list.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Gifts",
    }
  },
  RequestScreen: {
    screen: RequestScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/request-book.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Request",
    }
  }
});
