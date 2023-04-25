import React from 'react'
import {View, Dimensions} from 'react-native'
import Posts from '../components/Posts'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

export default function Home({navigation}){
    const tabHeight = useBottomTabBarHeight()
    return <View style={{height:Dimensions.get("screen").height-tabHeight*3}}>
        <Posts/>
    </View>
}
