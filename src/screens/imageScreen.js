import { Container, Spinner } from "native-base";
import React,{useEffect,useState} from "react";
import {Dimensions,View,StyleSheet,Image} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import getEnvVars from "../../environment";
import backend from "../api/backend";
import { AntDesign } from '@expo/vector-icons';

import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';

/*
Docs para descargar las imagenes
https://stackoverflow.com/questions/51353224/downloading-a-file-with-expo-why-is-this-so-hard
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
            await MediaLibrary.createAlbumAsync("Download", asset, false)
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

        <Container>
            <View style={{flex:0.001,alignItems:"flex-end",backgroundColor:"black",zIndex:1}}>
                    <TouchableOpacity onPress={()=>{
                        const uri = `${apiImageUrl}${apiImageSize}${image[0].image_id}.jpg`
                        let fileUri = FileSystem.documentDirectory + `${image[0].image_id}.jpg`;
                        FileSystem.downloadAsync(uri, fileUri)
                        .then(({ uri }) => {
                            saveFile(uri)
                        })
                        .catch(error => {
                            console.error(error);
                        })}}>
                        <AntDesign name="download" size={27} color="white" style={{margin:10}}/>
                    </TouchableOpacity>
                </View>
            
            <View style={{flex:1,justifyContent:"center", alignItems:"center", backgroundColor:'#000'}}>
                <Image source={{uri:`${apiImageUrl}${apiImageSize}${image[0].image_id}.jpg`}} style={{width: 400, height: 400}}/>
            </View>
        </Container>
    )


}

export default imageScreen;