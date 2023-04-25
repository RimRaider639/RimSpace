import React from 'react'
import {Text, View, FlatList, TextInput, Button} from 'react-native'
import useFetch from '../hooks/useFetch'
import { SocketContext } from '../contexts/socketContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
const getURL = `https://grizzly-lapis-pump.glitch.me/dm/`
const Chat = ({route}) => {
    console.log("params",route.params)
    const {chatID} = route.params
    const {io, chats, initialise} = React.useContext(SocketContext)
    const {data, error:GETerror, loading:GETloading, getData} = useFetch()
    const [text, setText] = React.useState("")
    // const currentChat = chats.filter(c=>c._id===chatID)
    // const [messages, setMessages] = useState(currentChat[0])
    const renderMessages = ({item, index}) => {
        return <Text>{item.username}: {item.message}</Text>
    }
    const onMessage = async () => {
        if (data){
            try {
                let other = ""
                const [a, b] = data.users
                const username = await AsyncStorage.getItem("@username")
                if (a===username){
                    other = b
                } else other = a
                console.log(io, other)
                io.io.emit("message", {from:other, chatID, message:text})
                setText("")  
            } catch (error) {
                console.log(error)
            }
            
        }
    }
    React.useEffect(()=>{
        getData(`https://grizzly-lapis-pump.glitch.me/dm/`+chatID)
    }, [chats])
    React.useEffect(()=>{
        if (GETerror) console.log(GETerror)
    }, [GETerror])
    console.log("data",data)

  return (
    <View>
        <Text>{data?.messages?.length?"Start a conversation":""}</Text>
        <FlatList data={data.messages} keyExtractor={(item, index)=>index} renderItem={renderMessages}/>
        <View style={{flexDirection:"row", width: "100%", alignItems:"center"}}>
            <TextInput style={{flex:1}} value={text} onChangeText={setText} placeholder='Send Message'/>
            <Button title="send" onPress={onMessage}/>
        </View>
    </View>
  )
}

export default Chat