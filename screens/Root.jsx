import React from 'react'
import TabNavigator from '../navigators/TabNavigator'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SocketContext } from '../contexts/socketContext'
const Root = ({route}) => {
  const {io, initialise} = React.useContext(SocketContext)

  React.useEffect(()=>{
    try {
      if (!io || (io && !io.io)) AsyncStorage.getItem("@username")
      .then(username=>{
        console.log("username", username)
          initialise(username)
      })
    } catch (error) {
      console.log(error)
    }
      
      return ()=>{
        if (io) io.disconnect()
      }
  }, [route.name])
  return (
    <>
        <TabNavigator/>
    </>
  )
}

export default Root