import React from 'react'
import {View, Text, Image, Button, FlatList, StyleSheet, RefreshControl, Pressable, Dimensions, Alert, ActivityIndicator} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFetch from '../hooks/useFetch'
import ProfilePosts from '../components/ProfilePosts';
import ProfileAvatar from '../components/ProfileAvatar';
import { SocketContext } from '../contexts/socketContext';
// import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const url = `https://peridot-curly-fedora.glitch.me/posts/profile`

export default function Profile({navigation}){
    // const tabHeight = useBottomTabBarHeight()
    const {io} = React.useContext(SocketContext)
    const {data, loading, error, getData} = useFetch()
    const [refreshing, setRefreshing] = React.useState(false);
    const [token, setToken] = React.useState(null)
    const [username, setUsername] = React.useState("")
    const [pfp, setPfp] = React.useState("")
    const onLogout = async () => {
        try{
            await AsyncStorage.multiRemove(["@token", "@username", "@pfp"])
            io.disconnect()
            navigation.navigate("LoggedOut")
        }catch(err){
            Alert.alert("Error Occurred")
        }
    }
    React.useEffect(()=>{
        AsyncStorage.getItem("@token")
        .then(token=>{
            if (token) setToken(token)
            else navigation.navigate("LoggedOut")
        })
        AsyncStorage.getItem("@username")
        .then(username=>{
            if (username) setUsername(username)
            else navigation.navigate("LoggedOut")
        })
        AsyncStorage.getItem("@pfp")
        .then(pfp=>{
            if (pfp) setPfp(pfp)
            else navigation.navigate("LoggedOut")
        })
    }, [])
    React.useEffect(()=>{

            if (token){
                getData(url, {headers: {token}})
                .then(()=>setRefreshing(false))
            } 
        
    }, [refreshing, token])

    return <View style={[styles.container]}>
        <View style={styles.top}>
            <ProfileAvatar username={username} pfp={pfp}/>
            <View style={styles.buttonGroup}>
                <Button title="Edit Profile" onPress={()=>navigation.navigate("Edit Profile")}/>
                <Button title="Logout" onPress={onLogout}/>
            </View>
            {loading?<ActivityIndicator size={"large"}/>:
//             error?<Text>Some error occurred...</Text>:
            <ProfilePosts data={data} admin={1} setRefreshing={setRefreshing} refreshing={refreshing}/>
            }
        </View>
    </View>
}

const styles = StyleSheet.create({
    top: {
        height:Dimensions.get("screen").height*0.73,
        width: "100%",
        gap: 30
    },
    container: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: 30,
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})