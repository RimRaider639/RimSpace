import React from 'react'
import {View, Text, Image, StyleSheet, Button} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

const url = `https://peridot-curly-fedora.glitch.me/posts/likes/`

export default function Post({post, view=false}){
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
            <Text style={styles.username}>{user.username}</Text>
        </View>
        <View style={styles.imgCont}>
            <Image src={image} style={styles.postImg}/>
        </View>
        <View style={styles.buttonGroup}>
            <Button title={liked?"Liked":"Like"} onPress={onLike}/>
            {!view && <Button title="Comments" onPress={onComment}/>}
        </View>
        <View>
            <Text>{likesArray.length} likes</Text>
        </View>
        <View style={styles.top}>
            <Text style={styles.username}>{user.username}</Text>
            <Text>{caption}</Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    postImg : {
        width: 250,
        height: 355
    },
    imgCont: {
        alignItems: "center"
    },
    pfp: {
        width: 30,
        height: 30,
        borderRadius: 100
    },
    top: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center"
    },
    container: {
        margin: 20,
        width: 250,
        gap: 20,
        // borderColor: "blue", borderWidth: 3
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    username: {
        fontWeight: 600,
        fontSize: 18
    }
})
