import React from 'react'
import {View, ActivityIndicator, StyleSheet, Button} from 'react-native'
import ProfileAvatar from '../components/ProfileAvatar' 
import ProfilePosts from '../components/ProfilePosts'
import useFetch from '../hooks/useFetch'
const url = `https://peridot-curly-fedora.glitch.me/posts/`

const OtherProfile = ({route}) => {
    const {user} = route.params
    const {data, res, loading, error, getData} = useFetch()
    const [refreshing, setRefreshing] = React.useState(false);
    React.useEffect(()=>{
        getData(url, {
            params: {
                userID: user._id
            }
        })
        .then(()=>setRefreshing(false))
    }, [refreshing])
  return (
    <View style={styles.container}>
        <ProfileAvatar username={user.username} pfp={user.pfp}/>
        <Button title="Message"/>
        {loading? <ActivityIndicator/>: <ProfilePosts data={data} refreshing={refreshing} setRefreshing={setRefreshing} admin={0}/>}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        gap: 30,
        padding: 30
    }
})

export default OtherProfile