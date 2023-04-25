import React from 'react'
import {View, ActivityIndicator, StyleSheet, Button} from 'react-native'
import ProfileAvatar from '../components/ProfileAvatar' 
import ProfilePosts from '../components/ProfilePosts'
import useFetch from '../hooks/useFetch'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { SocketContext } from '../contexts/socketContext'
const url = `https://peridot-curly-fedora.glitch.me/posts/`
const chatURL = `https://grizzly-lapis-pump.glitch.me/chats/join`

const OtherProfile = ({route}) => {
    const navigation = useNavigation()
    const {getChats} = React.useContext(SocketContext)
    const {user} = route.params
    const {data, loading, error, getData} = useFetch()
    const {data:chatData, error:msgError, loading:msgLoading, getData:getChat} = useFetch()
    const [refreshing, setRefreshing] = React.useState(false);
    const message = async () => {
        const username = await AsyncStorage.getItem("@username")
        getChat(chatURL, {params:{
            userA:username, userB:user.username
        }})
    }
    React.useEffect(()=>{
        getData(url, {
            params: {
                userID: user._id
            }
        })
        .then(()=>setRefreshing(false))
    }, [refreshing])
    React.useEffect(()=>{
        if (chatData.chat){
            getChats()
            navigation.navigate("Chat", {chatID:chatData.chat._id})
            
        }
        if (msgError){
            console.log(JSON.stringify(msgError))
        }
    }, [chatData, msgError])
  return (
    <View style={styles.container}>
        <ProfileAvatar username={user.username} pfp={user.pfp}/>
        <Button title="Message" disabled={msgLoading} onPress={message}/>
        {loading? <ActivityIndicator/>: <ProfilePosts data={data} refreshing={refreshing} setRefreshing={setRefreshing} admin={0}/>}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        gap: 30,
        padding: 30
    }
})

export default OtherProfile