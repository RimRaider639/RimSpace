import React from 'react'
import {FlatList, Image, View, Text, RefreshControl} from 'react-native'
import useFetch from '../hooks/useFetch'
import Post from '../components/Post'

const url = `https://peridot-curly-fedora.glitch.me/posts?sort=timestamp&order=desc`
export default function Posts({navigation}){
    const {data, loading, error, getData} = useFetch()
    const [refreshing, setRefreshing] = React.useState(false);
    React.useEffect(()=>{
        getData(url)
        .then(()=>setRefreshing(false))
    }, [refreshing])
    return <>
        {loading?<Text>Loading...</Text>:
        error?<Text>Some error occurred...</Text>:
        <FlatList
        data={data}
        keyExtractor={post=>post._id}
        renderItem={({item, index})=><Post post={item}/>}
        refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={()=>setRefreshing(true)} />
        }
        contentContainerStyle={{alignItems:"center"}}
    />}
    </>
}

