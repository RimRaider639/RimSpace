import React from 'react'
import {View, Text, FlatList, Image, TextInput, Button, StyleSheet, Alert, Dimensions, RefreshControl, Pressable, TouchableOpacity} from 'react-native' 
import AsyncStorage from '@react-native-async-storage/async-storage'
import useFetch from '../hooks/useFetch'
import Edit from './Edit'
import { useNavigation } from '@react-navigation/native'

const url = `https://peridot-curly-fedora.glitch.me/comments/`
const Comments = ({postID}) => {
    const navigation = useNavigation()
    const {data, res, loading, error, getData, postData, patchData, deleteData} = useFetch()
    const [content, setContent] = React.useState("")
    const [refreshing, setRefreshing] = React.useState(false);
    const [username, setUsername] = React.useState("")
    const [token, setToken] = React.useState("")
    const onPostComment = () => {
        try {
            postData(url, {postID, content}, {headers: {token}})
        } catch (error) {
            Alert.alert("Error occurred")
        }
        
    }
    const onEdit = (commentID, newContent) => {
        patchData(url+commentID, {content: newContent}, {headers: {token}})
    }
    const onDelete = (commentID) => {
        deleteData(url+commentID, {headers: {token}})
    }
    const renderItem = (item, index) => {
        return <View style={styles.comment} key={item._id}>
            <Image src={item.userID.pfp} style={styles.img}/>
            {/* <Text style={styles.username}></Text> */}
            <TouchableOpacity style={[styles.top, {width: username===item.userID.username?"50%":"100%"}]} onPress={()=>navigation.push("OtherProfile", {user:item.userID})}>
               <Text>{item.userID.username}: {item.content}</Text> 
            </TouchableOpacity>
            
            <View style={{display:username===item.userID.username?"flex":"none", flexDirection: "row", gap: 10, width: "50%"}}>
                <Edit content={item.content} onEdit={onEdit} commentID={item._id}/>
                <Pressable onPress={()=>onDelete(item._id)}>
                    <Text>Delete</Text>
                </Pressable>
            </View>
            
        </View>
    }


    React.useEffect(()=>{
        setContent("")
        getData(url, {
            params: {
                postID
            }
        })
        .then(()=>setRefreshing(false))
    }, [res, refreshing])
    React.useEffect(()=>{
        AsyncStorage.getItem("@token")
        .then(token=>{
            if (token) setToken(token)
            
        })
        AsyncStorage.getItem("@username")
        .then(username=>setUsername(username))
    }, [])
    React.useEffect(()=>{
        if (error){
            Alert.alert("Error occurred")
            console.log(error)
        }
    }, [error])
  return (
    <View style={styles.container}>
        <Text>Comments</Text>
        {data.map(renderItem)}
        <View style={styles.inputGroup}>
            <TextInput placeholder='Write a Comment' value={content} onChangeText={setContent}/>
            <Button title="Post" onPress={onPostComment}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        gap: 20,
        padding: 50
        // overflowY: "scroll",
        // height: Dimensions.get("screen").height * 0.2
    },
    inputGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    comment: {
        flexDirection: "row",
        gap: 15,
        alignItems: "center"
    },
    img: {
        width: 20,
        height: 20,
        borderRadius: 100
    },
    username: {
        fontWeight: 600
    },
    list: {
        gap: 20,
        margin: 20,
        bottom: 30
        // height: Dimensions.get("screen").height * 0.1
    }
})

export default Comments