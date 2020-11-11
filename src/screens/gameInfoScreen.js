import React, { useEffect, useState } from "react";
import {StyleSheet,Image,Dimensions,ScrollView,TouchableHighlight} from "react-native";
import {Content, H3, Text,View,Spinner, Body, Header, Thumbnail, Card, CardItem, Left, Container,Icon} from "native-base";
import getEnvVars from "../../environment";
import backend from "../api/backend";
import { ceil, log } from "react-native-reanimated";
import Circulos from "../obj/circulos"
import ScrollH from "../obj/scrollH"

const {apiKey,apiAuthorization,apiImageUrl,apiImageSize} = getEnvVars();
const {width, height} = Dimensions.get("window");

const gameInfoScreen = ({route,navigation}) => {

    const {name,id,pantalla} = route.params;
    const [game,setGame] = useState(null);
    const [error,setError] = useState(false);

    const getGameInfo = async () =>{
        try {
            try {
                const response = await backend.get(`games/?fields=screenshots.*,summary,cover.*,rating,platforms.*&search=${name}`,{
    
                    headers:{   'Client-ID':`${apiKey}`,
                                'Authorization':`${apiAuthorization}`},
                     
                    
                            
                });
                setGame(response.data);
            } catch (error) {
                setError(true);
            }
        } catch (error) {
            
        }
    }
    if(pantalla===1){
        screen = "gameList"
    }
    if(pantalla===2){
        screen = "searchResults"
    }
    if(pantalla===3){
        screen = "gamesbygenreScreen"
    }

    useEffect(()=>{

        getGameInfo();

    },[])

    if(!game){
        return(
            <View style={{flex:1,justifyContent:"center", alignItems:"center", backgroundColor:'#ffffd1'}}>
                <Image source = {require('../../assets/splash.gif')} style={{height: 200 }}/>
            </View>
        )
    }
    

	
    return(
        <Container style={{backgroundColor:'#0d4b56', flex:1}}>
            <View style={{flex:2/3, alignItems: 'center', justifyContent: 'center', paddingBottom:-30}}>
                <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <ScrollH 
                            ss={game[0].screenshots ? ( {uri:`${apiImageUrl}${apiImageSize}${game[0].screenshots[0].image_id}.jpg`}): require("../../assets/control1.png") }
                        />
                        <ScrollH 
                            ss={game[0].screenshots ? ( {uri:`${apiImageUrl}${apiImageSize}${game[0].screenshots[1].image_id}.jpg`}): require("../../assets/control1.png") }
                        />
                </ScrollView>
            </View>

            <ScrollView
                vertical={true}
                showsVerticalScrollIndicator={false}
                style={{flex:1/3}}
            >
                
                <Card style={styles.vertical}>
                    
                </Card>
                <Card style={styles.vertical}>
                    
                </Card>
            </ScrollView>
            <TouchableHighlight onPress={() => navigation.navigate(screen)} style={styles.icono}>
                    <View>
                        <Icon name="arrow-back" style={{color:"#fff",width:30, zIndex: 1}} />
                    </View>
            </TouchableHighlight>
            
        </Container>

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
        width: width*0.85,
        height:height*0.5,
    },
    ImageNotFound:{
        width : 70,
        height: 50,
        resizeMode:"contain"
    },
    icono:{
        position:'absolute',
        marginLeft:10,
        marginTop:10,
    },
    vertical:{
        borderColor:'#fff',
        backgroundColor:'#ff0000',
        borderWidth:3, 
        borderRadius:10, 
        height:height*0.5, 
        width:width*0.9,
        marginLeft:20,
        marginRight:20,
        marginTop:0,
        marginBottom:20
    },
});


export default gameInfoScreen;