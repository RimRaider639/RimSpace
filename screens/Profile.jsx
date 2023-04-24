import React from 'react'
import {View, Text, Image, Button, FlatList, StyleSheet, RefreshControl, Pressable, Dimensions, Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFetch from '../hooks/useFetch'
import BottomNav from '../components/BottomNav'

const url = `https://peridot-curly-fedora.glitch.me/posts/profile`

export default function Profile({navigation}){
    const {data, loading, error, getData} = useFetch()
    const [refreshing, setRefreshing] = React.useState(false);
    const [token, setToken] = React.useState(null)
    const [username, setUsername] = React.useState("")
    const [pfp, setPfp] = React.useState("")
    const renderPosts = ({item, index}) => {
        return <Pressable style={styles.imgContainer} onPress={()=>navigation.push("Post", {post:item, admin:1})}>
            <Image src={item.image} style={styles.img}/>
        </Pressable>
    }
    const onLogout = async () => {
        try{
            await AsyncStorage.removeItem("@token")
            navigation.navigate("LoggedOut")
        }catch(err){
            Alert.alert("Error Occurred")
        }
    }
    React.useEffect(()=>{
        AsyncStorage.getItem("@token")
        .then(token=>{
            if (token) setToken(token)
            else navigation.navigate("LoggedOut")
        })
        AsyncStorage.getItem("@username")
        .then(username=>{
            if (username) setUsername(username)
            else navigation.navigate("LoggedOut")
        })
        AsyncStorage.getItem("@pfp")
        .then(pfp=>{
            if (pfp) setPfp(pfp)
            else navigation.navigate("LoggedOut")
        })
    }, [])
    React.useEffect(()=>{

            if (token){
                getData(url, {headers: {token}})
                .then(()=>setRefreshing(false))
            } 
        
    }, [refreshing, token])

    return <View style={styles.container}>
        <View style={styles.top}>
            <View style={styles.avatar}>
                {pfp && <Image src={pfp} style={styles.pfp}/>}
                <Text style={styles.username}>{username}</Text>
            </View>
            <View style={styles.buttonGroup}>
                <Button title="Edit Profile" onPress={()=>navigation.navigate("Edit Profile")}/>
                <Button title="Logout" onPress={onLogout}/>
            </View>
            {loading?<Text>Loading...</Text>:
//             error?<Text>Some error occurred...</Text>:
            <FlatList
                columnWrapperStyle={styles.grid}
                data={data}
                numColumns={3}
                keyExtractor={post=>post._id}
                renderItem={renderPosts}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>setRefreshing(true)} />}
            />}
        </View>
        <BottomNav/>
    </View>
}

const styles = StyleSheet.create({
    img: {
        width: "100%",
        height: "100%",
    },
    imgContainer: {
        width: "30%",
        height: 150,
        alignItems: "center",
        marginBottom: 20
    },
    grid: {
        justifyContent: "space-between",
        gap:10
    },
    top: {
        height: Dimensions.get("screen").height*0.75,
        width: "100%",
        gap: 30
    },
    container: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: 30,
    },
    pfp: {
        height: 40,
        width: 40,
        borderRadius: 100
    },
    username: {
        fontWeight: 600,
        fontSize: 20
    },
    avatar: {
        flexDirection: "row",
        gap: 20,
        alignItems: "center"
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})