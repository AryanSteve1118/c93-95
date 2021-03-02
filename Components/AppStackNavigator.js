import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import GiftScreen from '../Screens/GiftScreen';
import ItemDetailScreen from '../Screens/ItemDetailScreen';
import RecieverDetailScreen  from '../Screens/RecieverDetailScreen';


export const AppStackNavigator = createStackNavigator({
  GiftList : {
    screen : GiftScreen,
    navigationOptions:{
      headerShown : false
    }
  },
  RecieverDetail : {
    screen : RecieverDetailScreen,
    navigationOptions:{
      headerShown : false
    }
  },
  ItemDetail:{
    screen : ItemDetailScreen,
    navigationOptions:{
      headerShown : false
    }
  }
},
  {
    initialRouteName: 'GiftList'
  }
);
