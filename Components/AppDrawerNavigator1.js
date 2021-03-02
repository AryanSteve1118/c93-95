import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSideBarMenu  from './CustomSideBarMenu';
import MyGiftScreen from '../Screens/MyGiftScreen';
import NotificationScreen from '../Screens/NotificationScreen';
import SettingScreen from '../Screens/SettingScreen';
import MyReceivedGiftScreen from '../Screens/MyReceivedGiftScreen';

import {Icon} from 'react-native-elements';

export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator,
    navigationOptions:{
      drawerIcon : <Icon name="home" type ="fontawesome5" />
    }
    },
  MyGifts : {
    screen : MyGiftScreen,
    navigationOptions:{
    drawerIcon : <Icon name="gift" type ="font-awesome" />,
    drawerLabel : "My Gifted Gifts"
    }
},
  
  Notification : {
    screen : NotificationScreen,
    navigationOptions:{
      drawerIcon : <Icon name="bell" type ="font-awesome" />,
      drawerLabel : "Notifications"
    }
  },
  MyReceivedGifts :{
    screen: MyReceivedGiftScreen,
    navigationOptions:{
      drawerIcon : <Icon name="gift" type ="font-awesome" />,
      drawerLabel : "My Received Gift"
    }
  },
  Setting : {
    screen : SettingScreen,
    navigationOptions:{
      drawerIcon : <Icon name="settings" type ="fontawesome5" />,
      drawerLabel : "Settings"
    },
  }
},
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })
