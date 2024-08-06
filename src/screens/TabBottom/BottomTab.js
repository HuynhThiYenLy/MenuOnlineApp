import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { useUser } from '../../redux/userContext';
import Cart from './Cart';
import Home from './Home';
import HoaDon from './HoaDon';
import User from './User';

const Tab = createBottomTabNavigator();

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

const BottomTab = () => {
  const { userID } = useUser(); // Lấy userID từ UserContext

  return (
    <Tab.Navigator screenOptions={tabScreenOptions} initialRouteName="Cart">
      <Tab.Screen name="Home">
        {props => <Home {...props} userID={userID} />}
      </Tab.Screen>
      <Tab.Screen name="Cart">
        {props => <Cart {...props} userID={userID} />}
      </Tab.Screen>
      <Tab.Screen name="HoaDon">
        {props => <HoaDon {...props} userID={userID} />}
      </Tab.Screen>
      <Tab.Screen name="User">
        {props => <User {...props} userID={userID} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomTab;
