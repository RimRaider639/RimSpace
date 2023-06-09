import React from 'react'
import {View, Button, Text, TextInput, StyleSheet, Dimensions, Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFetch from '../hooks/useFetch'

export default function Login({navigation}){
        const [email, setEmail] = React.useState("gordon123@gmail.com")
        const [password, setPassword] = React.useState("gordon")
        const [showPassword, setShowPassword] = React.useState(false);
        const {res, loading, error, postData} = useFetch()
    //     const [status, setStatus] = React.useState(null)
        const onSubmit = (e) => {
            const form = {
                email, password
            }
            for (let key in form){
                if (!form[key]){
                    Alert.alert(key+" can't be left empty")
                    return
                }
            }
            postData(`https://peridot-curly-fedora.glitch.me/user/login`, form)
        }
        React.useEffect(()=>{
                if (res){
                    AsyncStorage.setItem("@token", res.data.token)
                    .then(()=>{
                        AsyncStorage.setItem("@username", res.data.username)
                        .then(()=>{
                            AsyncStorage.setItem("@pfp", res.data.pfp)
                            .then(()=>navigation.navigate("Root"))
                        })
                        // setStatus("success")
                        
                    }
    //                 
                    )
                }
                if (error){
    //                 setStatus("error")
                    console.log(error)
                    if (error.response.data){
                        Alert.alert(error.response.data.message)
                    }
                }
        }, [res, error])
        return <View style={styles.container}>
            <View style={styles.form}>
                <TextInput value={email} KeyboardType="email-address" inputMode="email" onChangeText={setEmail} placeholder="Email Address"/>
                <TextInput value={password} keyboardType="visible-password" onChangeText={setPassword} placeholder="Password"/>
                <Button title="Login" disabled={loading} onPress={onSubmit}/>
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
        width: Dimensions.get("window").width*0.8,
        margin: "auto",
        border: "2px solid white",
        gap: 10
    }
})