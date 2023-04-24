import React from 'react'
import {View, TextInput, Button, Image, Alert, Dimensions, StyleSheet } from 'react-native'
import useFetch from '../hooks/useFetch'
import BottomNav from '../components/BottomNav'
import UploadImage from '../components/UploadImage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_IMG = `https://images.unsplash.com/photo-1618734479294-0d21359e67b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Z29yZG9uJTIwcmFtc2V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60`
const url = `https://peridot-curly-fedora.glitch.me/posts`
const GET_URL = `https://api.imgbb.com/1/upload?key=1ceb2351b7fa35f99502de57b2d8e7d0`
export default function Create({navigation}){
    const [caption, setCaption] = React.useState("")
    const {res, loading, error, postData} = useFetch()
    const [resourcePath, setResourcePath] = React.useState(null)

    const onSubmit = async () => {

        await getPublicURL()
    }
    const getPublicURL = async () =>{
            const form = new FormData();
            form.append("image", resourcePath.base64)
            try{
                await postData(GET_URL, form, {headers: {"Content-Type": "multipart/form-data"}})
            } catch(err){
                Alert.alert("Error Occurred", JSON.stringify(err))
            }
            return

        }
    React.useEffect(()=>{
        if (res) {
            res.data.message? navigation.navigate("Home"):
            AsyncStorage.getItem("@token").then(token=>postData(url, {image:res.data.data.display_url, caption}, {headers:{token}}))

        }
        if (error) Alert.alert(JSON.stringify(error))
    }, [res, error])

    return <View>
            <View style={styles.container}>
                <Image
                    source={{ uri: resourcePath?resourcePath.uri:DEFAULT_IMG }}
                    style={{ width: 200, height: 300 }}
                />
                <UploadImage setResourcePath={setResourcePath}/>
                <TextInput style={styles.caption} value={caption} onChangeText={setCaption} placeholder="Caption"/>
                <Button disabled={loading} title="Create" onPress={onSubmit}/>
            </View>
            <BottomNav/>
    </View>
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        height: Dimensions.get("screen").height*0.75,
        gap: 20,
        paddingTop: 30,
        paddingBottom: 30
    },
    caption: {
        width: "80%",
        borderWidth: 2,
        borderColor: "grey",
        paddingLeft: 20,
        paddingRight: 20
    }
})