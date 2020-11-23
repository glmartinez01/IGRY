import { Container, Spinner, Toast, Root} from "native-base";
import React,{useEffect,useState} from "react";
import {Dimensions,View,StyleSheet,ToastAndroid,Platform} from "react-native";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import getEnvVars from "../../environment";
import backend from "../api/backend";
import { AntDesign } from '@expo/vector-icons';

import Image from 'react-native-scalable-image';

import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';

/*
Docs para descargar las imagenes
https://stackoverflow.com/questions/51353224/downloading-a-file-with-expo-why-is-this-so-hard

Doc para auto escalar la imagen
https://www.skptricks.com/2018/11/react-native-responsive-image-scale-to-fit-example.html

Doc para las notificaciones(solo android)
https://docs.expo.io/versions/latest/react-native/toastandroid/

Doc para el toast, funciona para android y iphone pero el toastandroid se mira mejor en android
https://docs.nativebase.io/Components.html#toast-def-headref
*/

const {apiKey,apiAuthorization,apiImageUrl,apiSSSize,apiImageSize} = getEnvVars();
const {width, height} = Dimensions.get("window");

const imageScreen = ({route,navigation}) => {

    const {id} = route.params;
    const [image,setImage] = useState(null);
    const [error,setError] = useState(false);

    const saveFile = async (fileUri) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === "granted") {
            const asset = await MediaLibrary.createAssetAsync(fileUri)
            await MediaLibrary.createAlbumAsync("IGRY", asset, false)
        }
    }

    const getImage = async () =>{
        
        try {
            const response = await backend.post(`artworks/`,`fields *;where id=${id};`,{

                headers:{   'Client-ID':`${apiKey}`,
                            'Authorization':`${apiAuthorization}`},
                            
            });
            setImage(response.data);
            
        } catch (error) {
            setError(true);
            
        }

    }

    const poptoast = () => {
        if (Platform.OS != 'android') {
            Toast.show({
                text: 'Photo saved to this device',
                duration: 1500
              });
        } else {
            ToastAndroid.show('Photo saved to this device', ToastAndroid.LONG);
        }
    };

    useEffect(()=>{

        getImage();

    },[])

    if(!image){
        return(
            <View style={{flex:1,justifyContent:"center", alignItems:"center", backgroundColor:'#000'}}>
                <Spinner color="blue"/>
            </View>
        )
    }

    return(
        <Root>
            <Container>
                <View style={{flex:0.001,alignItems:"flex-end",backgroundColor:"black",zIndex:1}}>
                    <TouchableHighlight onPress={()=>{
                        const uri = `${apiImageUrl}${apiImageSize}${image[0].image_id}.jpg`
                        let fileUri = FileSystem.documentDirectory + `${image[0].image_id}.jpg`;
                        FileSystem.downloadAsync(uri, fileUri)
                        .then(({ uri }) => {
                            saveFile(uri)
                            poptoast()
                        })
                        .catch(error => {
                            console.error(error);
                        })}}>
                        <Image source={require("../../assets/download.png")}  width={50}/>
                    </TouchableHighlight>
                
                </View>
                <View style={{flex:1,justifyContent:"center", alignItems:"center", backgroundColor:'#000'}}>
                    <Image source={{uri:`${apiImageUrl}${apiImageSize}${image[0].image_id}.jpg`}} width={width}/>
                </View>
            </Container>
        </Root>
    )
}

export default imageScreen;