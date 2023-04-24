import React from 'react'
import {View, Image, StyleSheet, Dimensions, Pressable} from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function BottomNav(){
    const navigation = useNavigation()
    return <View style={styles.container}>
        <Pressable onPress={()=>navigation.navigate("Home")}>
            <Image source={require("../assets/icons/home.jpg")}/>
        </Pressable>
        <Image source={require("../assets/icons/search.jpg")}/>
        <Pressable onPress={()=>navigation.navigate("Create")}>
            <Image source={require("../assets/icons/new.jpg")} />
        </Pressable>
        <Image source={require("../assets/icons/Comment.jpg")}/>
        <Pressable onPress={()=>navigation.navigate("Profile")}>
            <Image source={require("../assets/icons/bell.jpg")}/>
        </Pressable>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: Dimensions.get("screen").width,
        bottom:0,
        backgroundColor: "white",
        height: Dimensions.get("screen").height*0.1
    }
})