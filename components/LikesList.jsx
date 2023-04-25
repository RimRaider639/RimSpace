import React from 'react'
import {FlatList, Modal, Pressable, View, Text} from 'react-native'
import ProfileAvatar from './ProfileAvatar'

const LikesList = ({likes, modalVisible, setModalVisible}) => {
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FlatList contentContainerStyle={{gap: 20}} data={likes} keyExtractor={item=>item._id} renderItem={({item})=><View>
                <ProfileAvatar pfp={item.pfp} username={item.username}/>
            </View>}/>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}>
              <Text>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    
  )
}

export default LikesList

const styles = {
    centeredView:  {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        // margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: 300,
        width: 200
      },
}