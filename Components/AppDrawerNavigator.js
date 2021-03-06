import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSideBarMenu  from './CustomSideBarMenu';
import MyGiftScreen from '../Screens/MyGiftScreen';
import NotificationScreen from '../Screens/Notification';
import SettingScreen from '../Screens/Setting';
import MyReceivedGiftScreen from '../Screens/MyReceivedGiftScreen';
import SendProposalScreen from '../Screens/SendProposalScreen';
import RecievedProposalScreen from '../Screens/RecievedProposalScreen';

import {Icon} from 'react-native-elements';

export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator
  },
  MyGifts : {
    screen : MyGiftScreen
  },  
  Notification : {
    screen : NotificationScreen
  },
  MyReceivedGifts :{
    screen: MyReceivedGiftScreen
  },
  Setting : {
    screen : SettingScreen
  },
  SendProposal : {
    screen : SendProposalScreen
  },
  RecievedProposal : {
    screen : RecievedProposalScreen
  }

},
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })
