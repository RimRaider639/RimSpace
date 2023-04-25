import React from 'react'
import TabNavigator from '../navigators/TabNavigator'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SocketContext } from '../contexts/socketContext'
const Root = ({route}) => {
  const {io, initialise} = React.useContext(SocketContext)

  React.useEffect(()=>{
      if (!io) AsyncStorage.getItem("@username")
      .then(username=>{
          initialise(username)
      })
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