import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import useFetch from '../hooks/useFetch'
import UploadImage from '../components/UploadImage'
import {View, TextInput, Button, Image, Alert, ToastAndroid} from 'react-native'
import { SocketContext } from '../contexts/socketContext'
const url = `https://peridot-curly-fedora.glitch.me/user/`
const DEFAULT_IMG = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0ZL7it9GAAc4a1Fb40d6fxu-paaRZ-zG2yQ&usqp=CAU"
const GET_URL = `https://api.imgbb.com/1/upload?key=1ceb2351b7fa35f99502de57b2d8e7d0`

const initUser = {
    username: "",
    email: "",
    pfp: DEFAULT_IMG
}
const EditProfile = () => {
    const {data, res, loading, error, getData, patchData, postData, reset} = useFetch()
    const {io, initialise} = React.useContext(SocketContext)
    const [token, setToken] = React.useState(null)
    const [resourcePath, setResourcePath] = React.useState(null)
    const [user, setUser] = React.useState(initUser)
    const getPublicURL = async () =>{
        const form = new FormData();
        form.append("image", resourcePath.base64)
        try{
            await postData(GET_URL, form, {headers: {"Content-Type": "multipart/form-data"}})
        } catch(err){
            console.log(err)
            Alert.alert("Error Occurred", JSON.stringify(err))
        }
    }
    const updateStorage = async ({username, pfp}) => {
        await AsyncStorage.setItem("@username", username)
        await AsyncStorage.setItem("@pfp", pfp)
        if (io.io) io.disconnect()
        initialise(username)
    }
    const onReset = () => {
        setUser(data)
    }
    const onSubmit = () => {
        patchData(url, user, {headers:{token}})
    }
    React.useEffect(()=>{
        AsyncStorage.getItem("@token")
        .then(token=>setToken(token))
    }, [])
    React.useEffect(()=>{
        if (token){
            getData(url, {headers: {token}})
        }
    }, [token])
    React.useEffect(()=>{
        if (data){
            const {password, ...rest} = data
            setUser(rest)
            if (rest.username && rest.pfp) updateStorage(rest)
        }
    }, [data])
    React.useEffect(()=>{
        if (resourcePath){
            getPublicURL()
        }
    }, [resourcePath])
    React.useEffect(()=>{
        if (res){
            if (res.data.message) {
                ToastAndroid.showWithGravity(
                    res.data.message,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                )
                getData(url, {headers: {token}})
            }
            else {
                setUser({...user, pfp:res.data.data.display_url})
            }
        }
        if (error){
            console.log(error)
            Alert.alert("Error occurred", JSON.stringify(error.response), [{text: 'OK', onPress: reset}])
        }
    }, [res, error])
  return (
    <View style={{padding: 20, gap: 20}}>
        <View style={{gap: 40, alignItems: "center"}}>
            <Image src={user.pfp?user.pfp:DEFAULT_IMG} style={{width: 100, height: 100, borderRadius: 100}}/>
            <UploadImage setResourcePath={setResourcePath}/>
        </View>
        <View style={{gap: 20, padding: 20}}>
            <TextInput value={user.username} onChangeText={e=>setUser({...user, username:e})}/>
            <TextInput value={user.email} onChangeText={e=>setUser({...user, email:e})}/>
            <View style={{flexDirection:"row", gap: 20}}>
                <Button title="Update" disabled={loading} onPress={onSubmit}/>
                <Button title="Reset" onPress={onReset}/>
            </View>
            
        </View>
    </View>
  )
}

export default EditProfile