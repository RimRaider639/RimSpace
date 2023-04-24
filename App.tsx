import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home'
import LoggedOut from './screens/LoggedOut'
import Login from './screens/Login'
import Create from './screens/Create'
import Register from './screens/Register'
import Profile from './screens/Profile'
import PostPage from './screens/PostPage'

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
  <>
    <NavigationContainer>
          <Stack.Navigator initialRouteName="LoggedOut">
            <Stack.Screen
              name="LoggedOut"
              component={LoggedOut}
              options={{title: 'Welcome!'}}
              />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Create" component={Create} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Post" component={PostPage} />
          </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}

export default App;
