import React, { useEffect, useState } from "react";
import {StyleSheet,Image} from "react-native";
import {Content, H1, Text,View,Spinner, Body} from "native-base";
import getEnvVars from "../../environment";
import backend from "../api/backend";

const {apiKey,apiAuthorization,apiImageUrl,apiImageSize} = getEnvVars();

const gameInfoScreen = ({route,navigation}) => {

    const {name,id} = route.params;
    const [games,setGames] = useState(null);
    const [error,setError] = useState(false);

    const getGameInfo = async () =>{
        try {
            try {
                const response = await backend.get(`?fields=summary,cover.*&search=${name}`,{
    
                    headers:{   'Client-ID':`${apiKey}`,
                                'Authorization':`${apiAuthorization}`}
                    
                            
                });
                setGames(response.data);
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

    if(!games){
        return(
            <View style={{flex:1,justifyContent:"center"}}>
                <Spinner color="blue"/>
                
            </View>
        )
    }

    return(
        <Content>
            <H1>{name}</H1>
           
            <Text>{games.summary}</Text>            
            <Image source={games.cover ? ( {uri:`${apiImageUrl}${apiImageSize}${games.cover.image_id}.jpg`}): require("../../assets/control.jpg") }
                    style = {styles.gameCover}/>
        </Content>

    );
}

const styles = StyleSheet.create({

    gameCover:{
        flex:1,
        width: 70,
        height:50,
        resizeMode:"contain"
    },
    ImageNotFound:{
        width : 70,
        height: 50
    },

});


export default gameInfoScreen;