import React from 'react'
import {View, Text, Image, Button, FlatList, StyleSheet, RefreshControl, Pressable, Dimensions, Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFetch from '../hooks/useFetch'
import BottomNav from '../components/BottomNav'

const url = `https://peridot-curly-fedora.glitch.me/posts/profile`

export default function Profile({navigation}){
    const {data, loading, error, getData} = useFetch()
    const [refreshing, setRefreshing] = React.useState(false);
        React.useEffect(()=>{
            getData(url)
            .then(()=>setRefreshing(false))
    }, [refreshing])
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
            if (token){
                getData(url, {headers: {token}})
            } else{
                navigation.navigate("LoggedOut")
            }
        })
    }, [refreshing])

    return <View style={styles.container}>
        <View style={styles.top}>
            <View>
                <Button title="Logout" onPress={onLogout}/>
            </View>
            {loading?<Text>Loading...</Text>:
//             error?<Text>Some error occurred...</Text>:
            <FlatList
                style={styles.grid}
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
        resizeMode: "contain"
    },
    imgContainer: {
        flex: 1,
        width: "30%",
        height: 150,
        alignItems: "center",
    },
    grid: {

    },
    top: {
        height: Dimensions.get("screen").height*0.75,
        width: "100%"
    },
    container: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    }
})