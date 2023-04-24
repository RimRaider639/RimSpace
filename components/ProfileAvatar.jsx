import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'

const ProfileAvatar = ({username, pfp}) => {
  return (
    <View style={styles.avatar}>
        {pfp && <Image src={pfp} style={styles.pfp}/>}
        <Text style={styles.username}>{username}</Text>
    </View>
  )
}

export default ProfileAvatar

const styles = StyleSheet.create({
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
})