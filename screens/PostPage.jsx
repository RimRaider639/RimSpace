import React from 'react'
import Post from '../components/Post'
import Comments from '../components/Comments';
import {View, Button, ToastAndroid, Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFetch from '../hooks/useFetch'
const url = `https://peridot-curly-fedora.glitch.me/posts/`

export default function PostPage({route}){
    const navigation = useNavigation()
    const {post, admin} = route.params
    const {res, loading, error, deleteData} = useFetch()
    const onDelete = () => {
        AsyncStorage.getItem("@token")
        .then(token=>deleteData(url+post._id, {headers: {token}}))
        .catch(error=>ToastAndroid.showWithGravity(
            error.message,
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
      ))
    }
    React.useEffect(()=>{
        if (res){
            ToastAndroid.showWithGravity(
                  res.data.message,
                  ToastAndroid.SHORT,
                  ToastAndroid.TOP,
            );
            navigation.navigate("Profile")
        }
        if (error){
            console.log(error)
            ToastAndroid.showWithGravity(
                error.message,
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
          );
        }
    }, [res, error])
    return <View>
        <Post post={post}/>
        {admin?<Button title="Delete post" onPress={onDelete} disabled={loading}/>:<></>}
        <Comments postID={post._id}/>
    </View>
}