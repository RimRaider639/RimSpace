import React from 'react'
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native'
import { SocketContext } from '../contexts/socketContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const Chats = () => {
    const navigation = useNavigation()
    const {chats, initialise, io} = React.useContext(SocketContext)
    const [username, setUsername] = React.useState("")
    const renderItem = ({item, index}) =>{
        let other;
        for (let user of item.users){
            if (user!==username){
                other = user
                break;
            }
        }
        return <View  style={styles.chat}>
            <TouchableOpacity style={styles.flex} onPress={()=>navigation.navigate("Chat", {chatID:item._id})}>
                <Text>{io.onlineUsers.includes(other)?"Online":"Offline"}</Text>
                <Text style={styles.username}>{other}</Text>
                <Text>{item.messages.length?item.messages[item.messages.length-1].message:""}</Text>
            </TouchableOpacity>
        </View>
    }
    React.useEffect(()=>{
        if (!io) initialise()
        console.log("chats", username)
        AsyncStorage.getItem("@username")
        .then(username=>setUsername(username))
    }, [])
  return (
    <View style={styles.container}>
        <FlatList data={chats} keyExtractor={(chat, index)=>index} renderItem={renderItem} contentContainerStyle={styles.chatsContainer}/>
    </View>
  )
}

export default Chats

const styles = StyleSheet.create({
    chat: {
        width: "100%",
        padding: 20,
        borderWidth: 2,
        borderColor: "gray",
        borderRadius: 20,
        backgroundColor: "pink"
    },
    chatsContainer: {
        width: "100%",
        gap: 15
    },
    container: {
        padding: 20
    },
    flex: {
        flexDirection: "row",
        gap: 20
    },
    username: {
        fontWeight: 900
    }
})