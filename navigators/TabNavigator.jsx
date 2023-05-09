import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createMaterialBottomTabNavigator } from 'react-native-paper';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Create from '../screens/Create';
import BottomTabItems from '../components/BottomTabItems';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import {View} from 'react-native'

const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  const navigation = useNavigation()
  return (
            <Tab.Navigator
              initialRouteName='Home' 
              tabBar={(props) => <BottomTabItems {...props} />} 
              screenOptions={({ route }) => ({
                tabBarStyle:{paddingVertical: 5,borderTopLeftRadius:15,borderTopRightRadius:15,backgroundColor:'red',position:'absolute',height:50, justifyContent: 'space-around'},
                tabBarLabelStyle:{paddingBottom:3},
              })}
            >
              <Tab.Screen name="Home" component={Home} options={{
                headerRight: ()=><View style={{flexDirection:"row"}}>
                  <Button onPress={()=>navigation.navigate("Search")}>Search</Button>
                  <Button onPress={()=>navigation.navigate("Chats")}>Chat</Button>
                </View>
              }}/>
              <Tab.Screen name="Create" component={Create} />
              <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
  )
}

export default TabNavigator