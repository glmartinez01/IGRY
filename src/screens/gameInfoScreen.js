import React, { useEffect, useState } from "react";
import {StyleSheet,Image,Dimensions} from "react-native";
import {Content, H1, Text,View,Spinner, Body} from "native-base";
import getEnvVars from "../../environment";
import backend from "../api/backend";
import { log } from "react-native-reanimated";

const {apiKey,apiAuthorization,apiImageUrl,apiImageSize} = getEnvVars();
const {width, height} = Dimensions.get("window");

const gameInfoScreen = ({route,navigation}) => {

    const {name,id} = route.params;
    const [game,setGame] = useState(null);
    const [error,setError] = useState(false);

    const getGameInfo = async () =>{
        try {
            try {
                const response = await backend.get(`?fields=summary,cover.*&search=${name}`,{
    
                    headers:{   'Client-ID':`${apiKey}`,
                                'Authorization':`${apiAuthorization}`}
                    
                            
                });
                setGame(response.data);
                //{console.log(response.data)};
            } catch (error) {
                setError(true);
            }
        } catch (error) {
            
        }
    }

    useEffect(()=>{

        getGameInfo();

    },[])

    if(!game){
        return(
            <View style={{flex:1,justifyContent:"center"}}>
                <Spinner color="blue"/>
                
            </View>
        )
    }

    return(
        <Content>
            <H1>{name}</H1>    
            <Image source={game[0].cover ? ( {uri:`${apiImageUrl}${apiImageSize}${game[0].cover.image_id}.jpg`}): require("../../assets/control.jpg") }
                    style = {styles.gameCover}/>
            <Text style={{alignContent:"center"}}>{game[0].summary?game[0].summary:`Description not available!`}</Text>  
        </Content>

    );
}

const styles = StyleSheet.create({

    gameCover:{
        flex:1,
        width: width*0.99,
        height:height*0.5,
        resizeMode:"contain"
    },
    ImageNotFound:{
        width : 70,
        height: 50,
        resizeMode:"contain"
    },

});


export default gameInfoScreen;