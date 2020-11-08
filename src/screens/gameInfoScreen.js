import React, { useEffect, useState } from "react";
import {StyleSheet,Image,Dimensions} from "react-native";
import {Content, H3, Text,View,Spinner, Body, Header, Thumbnail, Card, CardItem, Left} from "native-base";
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
                const response = await backend.get(`games/?fields=screenshots.*,summary,cover.*,rating&search=${name}`,{
    
                    headers:{   'Client-ID':`${apiKey}`,
                                'Authorization':`${apiAuthorization}`},
                     
                    
                            
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
            <View style={{flex:1,justifyContent:"center", alignItems:"center"}}>
                <Image source = {require('../../assets/splash.gif')} style={{height: 200 }}/>
            </View>
        )
    }

    return(
        <Content style={{backgroundColor:'#0d4b56'}}>
            <View style={{alignItems:"center"}}>
                <Card style={{ borderColor:'#0b0d14',width:width*0.95,alignItems:"center",justifyContent:"center"}}>
                    <CardItem style={{height:height*0.35,backgroundColor:'#1c2134',borderRadius:0}}>
                        
                        <Image source={game[0].screenshots ? ( {uri:`${apiImageUrl}${apiImageSize}${game[0].screenshots[0].image_id}.jpg`}): require("../../assets/control1.png") }
                                style = {styles.gameCover} />
                    </CardItem>
                    <CardItem style={{backgroundColor:'#007a7c',borderRadius:0}}>
                        <Left>
                            <Thumbnail source={game[0].cover ? ( {uri:`${apiImageUrl}${apiImageSize}${game[0].cover.image_id}.jpg`}): require("../../assets/control1.png") }
                                        style = {styles.gameThumbnail} />
                            <Body>
                                <H3 style={{color:'white'}}>{name}</H3>
                                
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
                
                <Text style={{color:'#ffffff',alignContent:"center",margin:35,fontSize:20}}>
                   Summary: {game[0].summary?game[0].summary:`Description not available!`}
                </Text>
            </View>   
        </Content>

    );
}

const styles = StyleSheet.create({
    header:{
        flex:1,
        height:height*0.5,
        width:width*0.98,
    
    },
    gameThumbnail:{
        width:50,
        height:50,
        resizeMode:"contain"
    },
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