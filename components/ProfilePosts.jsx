import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {FlatList, StyleSheet, Pressable, Image, RefreshControl} from 'react-native'

const ProfilePosts = ({data, admin, setRefreshing, refreshing}) => {
    const navigation = useNavigation()
    const renderPosts = ({item, index}) => {
        return <Pressable style={styles.imgContainer} onPress={()=>navigation.push("Post", {post:item, admin})}>
            <Image src={item.image} style={styles.img}/>
        </Pressable>
    }
  return (
    <FlatList
        columnWrapperStyle={styles.grid}
        data={data}
        numColumns={3}
        keyExtractor={post=>post._id}
        renderItem={renderPosts}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>setRefreshing(true)} />}
    />
  )
}

export default ProfilePosts

const styles = StyleSheet.create({
    img: {
        width: "100%",
        height: "100%",
    },
    imgContainer: {
        width: "30%",
        height: 150,
        alignItems: "center",
        marginBottom: 10,
        flex: 1/3
    },
    grid: {
        gap:10
    },
})