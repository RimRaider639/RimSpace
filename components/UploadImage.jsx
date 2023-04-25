import React from 'react'
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {View, Text, TextInput, Button, Image, TouchableOpacity, Alert, PermissionsAndroid, Dimensions, StyleSheet } from 'react-native'

const UploadImage = ({setResourcePath}) => {
    const selectFile = () => {
        const options = {
          maxWidth: 200,
          maxHeight: 300,
          includeBase64: true
        };
        launchImageLibrary(options, res => {
//                 console.log("response = ", res)
          if (res.didCancel) {
            console.log('User cancelled image picker');
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
            Alert.alert(res.customButton);
          } else {
            setResourcePath(res.assets[0])
          }
        });
      };
const requestCameraPermission = async () => {
try {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
    {
      title: "App Camera Permission",
      message:"App needs access to your camera ",
      buttonNeutral: "Ask Me Later",
      buttonNegative: "Cancel",
      buttonPositive: "OK"
    }
  );
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    console.log("Camera permission given");
    openCamera()
  } else {
    console.log("Camera permission denied");
  }
} catch (err) {
  console.warn(err);
}
};
const openCamera = () => {
            const options = {
              maxWidth: 200,
              maxHeight: 300,
              includeBase64: true,
              storageOptions: {
                    skipBackup: true,
                    path: 'images',
              },
              cameraType: "front",
              mediaType: "photo"
            };
            launchCamera(options, res => {
//                     console.log("response = ", res)
              if (res.didCancel) {
                console.log('User cancelled image picker');
              } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
              } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                Alert.alert(res.customButton);
              } else {
                setResourcePath(res.assets[0])
              }
            });
          };
  return (
    <View style={styles.upload}>
        <Button style={styles.btn} title="Open Camera" onPress={requestCameraPermission}/>
        <Button style={styles.btn} title="Select from Galery" onPress={selectFile}/>
    </View>
  )
}

export default UploadImage

const styles = StyleSheet.create({
    upload: {
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    btn: {
        flexGrow:1
    },
})