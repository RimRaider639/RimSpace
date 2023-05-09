import React from 'react'
import {Text, View, FlatList, Dimensions, StyleSheet} from 'react-native'
import {TextInput, Button} from 'react-native-paper'
import useFetch from '../hooks/useFetch'
import { SocketContext } from '../contexts/socketContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
const getURL = `https://grizzly-lapis-pump.glitch.me/dm/`
const Chat = ({route}) => {
    const {chatID} = route.params
    const {io, chats, initialise, getChats, setChats} = React.useContext(SocketContext)
    // const {data, error:GETerror, loading:GETloading, getData} = useFetch()
    const [text, setText] = React.useState("")
    const [height, setHeight] = React.useState(0);
    const [username, setUsername] = React.useState(null)
    const [messages, setMessages] = React.useState(null)
    const renderMessages = ({item, index}) => {
        return <View style={[styles.chat, item.from===username?styles.sent:styles.recieved]}>
            {item.from!==username?
            <>
                <Text style={{fontWeight: 600, color: "pink"}}>{item.from}</Text>
                <Text>{item.message}</Text>
            </>:
            <>
                <Text style={{fontWeight: 600, color: "grey"}}>{item.from}</Text>
                <Text>{item.message}</Text> 
            </>
            }
        </View>
    }
    const onMessage = async () => {
        if (!text.trim().length) return
        if (currentChat && username){
            const others = currentChat.users.filter(u=>u!=username)

            try {
                io.io.emit("message", {from:username, chatID, message:text.trim(), to:others[0]})
                io.setChats(setChats, {from:username, chatID, message:text.trim(), to:others[0]})
                setText("")  
            } catch (error) {
                console.log(error)
            }
            
        }
    }
    React.useEffect(()=>{
        AsyncStorage.getItem("@username")
        .then(username=>setUsername(username))
    }, [])
    // React.useEffect(()=>{
    //     getData(getURL+chatID)
    //     .then(()=>setRefreshing(false))
    // }, [refreshing])
    // React.useEffect(()=>{
    //     if (GETerror) console.log(GETerror)
    // }, [GETerror])

    //debugging
    React.useEffect(()=>{
        // console.log("debug io", io.io)
        if (!io.io) initialise(username)
    }, [io.io])
    React.useEffect(()=>{
        currentChat = chats.filter(c=>c._id===chatID)[0]
        // console.log("check chat update",currentChat)
        setMessages(currentChat.messages)
        console.log("chats updated", messages)
    }, [chats])

  return (
    <View style={styles.container}>
        <Text>{messages && !messages.length?"Start a conversation":""}</Text>
        <FlatList inverted={-1} data={messages} keyExtractor={(item, index)=>index} renderItem={renderMessages} contentContainerStyle={styles.chatContainer}/>
        <View style={styles.send}>
            <TextInput 
            style={{flex:1, height:Math.max(45, height)}}
            value={text} 
            onChangeText={setText} 
            placeholder='Send Message' 
            multiline={true}
            // onContentSizeChange={(event) =>
            //     setHeight(event.nativeEvent.contentSize.height)
            // }
            />
            <Button onPress={onMessage}>Send</Button>
        </View>
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({
    chatContainer: {
        gap:10, 
        width: "100%",
        flexDirection: "column-reverse"
    },
    chat: {
        width: 250,
        padding: 15,
        borderRadius: 20
    },
    recieved: {
        backgroundColor: "grey",
        alignItems: "flex-start",

    },
    sent: {
        backgroundColor: "pink",
        alignItems: "flex-end",
        alignSelf: "flex-end"
    },
    container: {
        height: Dimensions.get("window").height*0.95,
        padding: 20,
        width: "100%",
        borderWidth: 5,
        paddingBottom: 90

    },
    send: {
        flexDirection:"row", 
        width: Dimensions.get("window").width, 
        alignItems:"center", 
        padding: 20, 
        position: "absolute", 
        bottom: 0,
        justifyContent: "space-between",
        backgroundColor: "black",
        // borderWidth: 3,
        // borderColor: "red"
    }
})