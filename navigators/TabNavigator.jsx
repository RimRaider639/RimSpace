import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Create from '../screens/Create';
import BottomTabItems from '../components/BottomTabItems';
import Chats from '../screens/Chats';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
            <Tab.Navigator
              initialRouteName='Home' 
              tabBar={(props) => <BottomTabItems {...props} />} 
              screenOptions={({ route }) => ({
                tabBarStyle:{paddingVertical: 5,borderTopLeftRadius:15,borderTopRightRadius:15,backgroundColor:'red',position:'absolute',height:50, justifyContent: 'space-around'},
                tabBarLabelStyle:{paddingBottom:3},
              })}
            >
              <Tab.Screen name="Home" component={Home} />
              <Tab.Screen name="Create" component={Create} />
              <Tab.Screen name="Chats" component={Chats} />
              <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
  )
}

export default TabNavigator