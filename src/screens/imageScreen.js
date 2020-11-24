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

const {apiKey,apiAuthorization,apiImageUrl,apiImageSize} = getEnvVars();
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