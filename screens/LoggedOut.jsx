import React from 'react'
import {View, Text, Image, Button, StyleSheet, Dimensions} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoggedOut({navigation}){
    React.useEffect(()=>{
        AsyncStorage.getItem("@token")
        .then(token=>{
            console.log(token)
            if (token) navigation.navigate("Home")
        })

    }, [])
    return <View>
        <View style={styles.img}>
            <Image source={require("../assets/images/Rectangle.png")}/>
        </View>
        <View style={styles.buttonGroup}>
            <Button style={styles.btn} onPress={()=>navigation.navigate('Login')} title="Login"/>
            <Button style={styles.btn} onPress={()=>navigation.navigate('Register')} title="Register"/>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    img: {
        flex: 3
    },
    buttonGroup: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        backgroundColor: "white",
        padding: 20,
        top: 600
    },
    btn: {
        border: "1px solid white",
        color: "white",
        padding: "5px 15px",
        backgroundColor: "black"
    }
})