import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoggedOut from '../screens/LoggedOut';
import Login from '../screens/Login';
import Register from '../screens/Register';
import PostPage from '../screens/PostPage';
import EditProfile from '../screens/EditProfile';
import OtherProfile from '../screens/OtherProfile';
import Root from '../screens/Root';
import Chat from '../screens/Chat';
import Chats from '../screens/Chats';
import Search from '../screens/Search';
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="LoggedOut">
          <Stack.Screen
              name="LoggedOut"
              component={LoggedOut}
              options={{title: 'Welcome!'}}
              />
          <Stack.Screen name="Root" component={Root} options={{headerShown:false}}/>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Post" component={PostPage} />
          <Stack.Screen name="Edit Profile" component={EditProfile} />
          <Stack.Screen name="Chats" component={Chats} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="OtherProfile" component={OtherProfile} options={{title: "Profile"}}/>
          <Stack.Screen name="Search" component={Search} options={{title: "Search User"}}/>
        </Stack.Navigator>
</NavigationContainer>
  )
}

export default StackNavigator