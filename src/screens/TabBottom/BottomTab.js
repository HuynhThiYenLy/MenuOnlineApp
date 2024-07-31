import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import Cart from './Cart';
import Home from './Home';
import HoaDon from './HoaDon';
import User from './User';

const tabScreenOptions = ({ route }) => ({
  headerShown: false,
  tabBarIcon: ({ focused }) => {
    let iconSource;
    switch (route.name) {
      case 'Cart':
        iconSource = focused ? require('../../img/cart.png') : require('../../img/cart.png');
        break;
      case 'Home':
        iconSource = focused ? require('../../img/home_X.png') : require('../../img/home.png');
        break;
      case 'HoaDon':
        iconSource = focused ? require('../../img/bell_x.png') : require('../../img/bell.png');
        break;
      case 'User':
        iconSource = focused ? require('../../img/user_x.png') : require('../../img/user.png');
        break;
    }

    return <Image source={iconSource} style={{ width: 20, height: 20 }} />;
  },
  tabBarLabel: ({ focused }) => null
});

const BottomTab = () => (
  <Tab.Navigator screenOptions={tabScreenOptions} initialRouteName="Cart">
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Cart" component={Cart} />
    <Tab.Screen name="HoaDon" component={HoaDon} />
    <Tab.Screen name="User" component={User} />
  </Tab.Navigator>
);

export default BottomTab;
