import React from 'react'
import {View, ScrollScreen, Text, Dimensions} from 'react-native'
import Posts from '../components/Posts'
import BottomNav from '../components/BottomNav'

export default function Home({navigation}){

    return <View style={{height: Dimensions.get("screen").height*0.85}}>
        <Posts/>
        <BottomNav/>
    </View>
}