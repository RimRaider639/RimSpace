import React from 'react'
import useFetch from '../hooks/useFetch'
import {View, Text, TextInput, Button, Image, StyleSheet, Alert, Dimensions} from 'react-native'
import UploadImage from '../components/UploadImage'
const DEFAULT_IMG = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0ZL7it9GAAc4a1Fb40d6fxu-paaRZ-zG2yQ&usqp=CAU"
const GET_URL = `https://api.imgbb.com/1/upload?key=1ceb2351b7fa35f99502de57b2d8e7d0`

export default function Register({navigation}){
    const [username, setUsername] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [showPassword, setShowPassword] = React.useState(false);
    const [resourcePath, setResourcePath] = React.useState(null)
    const {res, loading, error, postData} = useFetch()
//     const [status, setStatus] = React.useState(null)
    const getPublicURL = async () =>{
        const form = new FormData();
        form.append("image", resourcePath.base64)
        try{
            await postData(GET_URL, form, {headers: {"Content-Type": "multipart/form-data"}})
        } catch(err){
            console.log(err)
            Alert.alert("Error Occurred", JSON.stringify(err))
        }
        return

    }
    const createUser = (form, publicURL) => {
        if (publicURL) form.pfp = publicURL
        console.log(form)
        postData(`https://peridot-curly-fedora.glitch.me/user/register`, form)
    }
    const onSubmit = () => {
        const form = {
            username, email, password
        }
        for (let key in form){
            if (!form[key]){
                Alert.alert(key+" can't be left empty")
                return
            }
        }
        if (resourcePath){
            getPublicURL()
        } else createUser(form)
    }
    React.useEffect(()=>{
            if (res){
//                 setStatus("success")
                if (res.data.message) navigation.navigate("Login")
                else createUser({username, email, password},res.data.data.display_url)
            }
            if (error){
//                 setStatus("error")
                console.log(error)
                if (error.response.status===409){
                    Alert.alert(error.response.data.message)
                } else{
                    
                    Alert.alert("Error", JSON.stringify(error.response))
                }
            }
    }, [res, error])
    return <View style={styles.container}>
        <View style={styles.form}>
            <View style={[styles.row, styles.small]}>
                <Image style={styles.image} src={resourcePath? resourcePath.uri : DEFAULT_IMG}/>
                <UploadImage setResourcePath={setResourcePath}/>
            </View>
            <TextInput mode="outlined" value={username} onChangeText={setUsername} placeholder="Username"/>
            <TextInput mode="outlined" value={email} KeyboardType="email-address" inputMode="email" onChangeText={setEmail} placeholder="Email Address"/>
            <TextInput mode="outlined" value={password} keyboardType="visible-password" onChangeText={setPassword} placeholder="Password"/>
            <Button title="Register" onPress={onSubmit}/>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width,
        justifyContent: "center",
        alignItems: "center"
    },
    form : {
        width: Dimensions.get("window").width*0.85,
        margin: "auto",
        border: "2px solid white",
        gap: 10
    },
    image: {
        height: 50,
        width: 50,
        margin: 10,
        borderRadius: 100
    },
    row: {
        flexDirection: "row"
    },
    small: {
        fontSize: 1
    }
})