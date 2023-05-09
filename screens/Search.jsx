import React from 'react'
import {Searchbar, TextInput} from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons';
import {View, StyleSheet, FlatList, ActivityIndicator, Pressable, TouchableHighlight} from 'react-native'
import useFetch from '../hooks/useFetch';
import { Text } from 'react-native';
import ProfileAvatar from '../components/ProfileAvatar';
import { useNavigation } from '@react-navigation/native';
const url = `https://peridot-curly-fedora.glitch.me/user/all`


var id;
const debounce = (fn, delay) => {
    if (id){
        clearTimeout(id)
    }
    id = setTimeout(fn, delay)
}

const Search = () => {
    const navigation = useNavigation()
    const [username, setUsername] = React.useState("")
    const {data, loading, error, getData} = useFetch()
    const renderUsers = ({item, index})=>{
        return <TouchableHighlight onPress={()=>navigation.navigate("OtherProfile", {user: item})}>
            <ProfileAvatar pfp={item.pfp} username={item.username}/>
        </TouchableHighlight>
    }
    React.useEffect(()=>{
        if (username.length){
            debounce(()=>getData(url, {params: {username_like:username}}), 1000)
        }
        // debounce(()=>getData(url, {params: {username_like:username}}), 1000)
        
    }, [username])
    console.log(data)
  return (
    <View style={styles.container}>
        <TextInput mode={"outlined"} value={username} onChangeText={setUsername} placeholder='Search user' left={<Icon name="search" size={30} color="rgba(252, 228, 236, 1)"/>}/>
        {loading?<ActivityIndicator/>:<FlatList data={data} keyExtractor={(item, index)=>item._id} renderItem={renderUsers} contentContainerStyle={{gap: 20}}/>}
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
    container: {
        padding: 20,
        gap: 20
    }
})