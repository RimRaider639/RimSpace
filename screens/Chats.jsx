import React from 'react'
import {View, Text, FlatList} from 'react-native'
import { SocketContext } from '../contexts/socketContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Chats = () => {
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
        return <View>
            <Text>{other}</Text>
        </View>
    }
    React.useEffect(()=>{
        if (!io) initialise()
        AsyncStorage.getItem("@username")
        .then(username=>setUsername(username))
    }, [])
  return (
    <View>
        <FlatList data={chats} keyExtractor={(chat, index)=>index} renderItem={renderItem}/>
    </View>
  )
}

export default Chats