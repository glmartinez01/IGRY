import { Spinner } from "native-base";
import React,{useEffect,useState} from "react";
import {Dimensions,View,StyleSheet,Image} from "react-native";
import getEnvVars from "../../environment";
import backend from "../api/backend";
import gameInfoScreen from "./gameInfoScreen";

const {apiKey,apiAuthorization,apiImageUrl,apiSSSize,apiImageSize} = getEnvVars();
const {width, height} = Dimensions.get("window");

const simageScreen = ({route,navigation}) => {

    const {id} = route.params;
    const [image,setImage] = useState(null);
    const [error,setError] = useState(false);

    const getImage = async () =>{
        
        try {
            const response = await backend.post(`screenshots/`,`fields *;where id=${id};`,{

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
        
        <View style={{flex:1,justifyContent:"center", alignItems:"center", backgroundColor:'#000'}}>
            <Image source={{uri:`${apiImageUrl}${apiImageSize}${image[0].image_id}.jpg`}} style={{width: 350, height: 260}}/>
        </View>
    )


}

export default simageScreen;