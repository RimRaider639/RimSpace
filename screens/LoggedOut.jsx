import React from 'react'
import {View, Text, Image, Button, StyleSheet, Dimensions} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SocketContext } from '../contexts/socketContext';

export default function LoggedOut({navigation}){
    const {io} = React.useContext(SocketContext)
    React.useEffect(()=>{
        AsyncStorage.getItem("@token")
        .then(token=>{
            console.log(token)
            if (token) navigation.navigate("Root")
        })
        if (io) io.disconnect()

    }, [])

    return <View>
        <View style={styles.img}>
            <Image source={require("../assets/images/Rectangle.png")}/>
        </View>
        <View style={styles.brandContainer}>
            <Text style={styles.brand}>RimSpace</Text>
        </View>
        <View style={styles.buttonGroup}>
            <Button style={styles.btn} onPress={()=>navigation.navigate('Login')} title="Login"/>
            <Button style={styles.btn} onPress={()=>navigation.navigate('Register')} title="Register"/>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width
    },
    img: {
        width: "100%",
        height: "100%"
    },
    buttonGroup: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        backgroundColor: "white",
        padding: 20,
        position: "absolute",
        bottom: 0
    },
    btn: {
        border: "1px solid white",
        color: "white",
        padding: "5px 15px",
        backgroundColor: "black"
    },
    brand: {
        fontWeight: 900,
        color: "grey",
        fontSize: 30
    },
    brandContainer: {
        position: "absolute",
        top: Dimensions.get("window").height*0.4,
        textAlign: "center",
        width: Dimensions.get("window").width,
        justifyContent: "center",
        flexDirection: "row"
    }
})