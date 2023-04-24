import React from 'react'
import {View, Text, Image, StyleSheet, Button} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

const url = `https://peridot-curly-fedora.glitch.me/posts/likes/`

export default function Post({post}){
    const navigation = useNavigation()
    const {_id, image, userID:user, caption, likes} = post
    const [liked, setLiked] = React.useState(false)
    const [likesArray, setLikesArray] = React.useState(likes)
    const onLike = () => {
        AsyncStorage.getItem("@token")
        .then(token=>{
            if (token) {
                axios.patch(url+_id, {}, {headers: {token}})
                .then(res=>{
                    setLiked(res.data.message==="liked")
                    setLikesArray(res.data.likes)
                })
            }
        })
    }
    const onComment = () => {
        navigation.push("Post", {post})
    }
    return <View style={styles.container}>
        <View style={styles.top}>
            <Image src={user.pfp} style={styles.pfp}/>
            <Text>{user.username}</Text>
        </View>
        <View>
            <Image src={image} style={styles.postImg}/>
        </View>
        <View style={styles.buttonGroup}>
            <Button title={liked?"Liked":"Like"} onPress={onLike}/>
            <Button title="Comments" onPress={onComment}/>
        </View>
        <View>
            <Text>{likesArray.length} likes</Text>
        </View>
        <View>
            <Text>{caption}</Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    postImg : {
        resizeMode: 'contain',
        width: 200,
        height: 300
    },
    pfp: {
        resizeMode: 'contain',
        width: 20,
        height: 20,
        borderRadius: 100
    },
    top: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center"
    },
    container: {
        margin: 20,
        width: "90%",
        gap: 10
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})
