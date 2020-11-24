import React, { useEffect, useState } from "react";
import {StyleSheet,View,Text,Dimensions, Image} from "react-native";
import { Container, H1,Spinner,Card,CardItem,Body,H3,Thumbnail, Left, Button, Right } from "native-base";
import backend from "../api/backend";
import { FlatList, ScrollView, TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import getEnvVars from "../../environment"

const pantalla = 2;
const {width, height} = Dimensions.get("window");
const {apiKey,apiAuthorization,apiImageUrl,apiImageSize} = getEnvVars();

const searchResults = ({route,navigation}) => {
    const {search} = route.params;
    const [games,setGames] = useState(null);
    const [error,setError] = useState(false);


    const getSearchGames = async () => {
        try {
            const response = await backend.post(`games/`,`fields name,rating,cover.*;limit 20;search "${search}";`,{

                headers:{   'Client-ID':`${apiKey}`,
                            'Authorization':`${apiAuthorization}`}
                        
            });
            setGames(response.data);
        } catch (error) {
            setError(true);
        }
        
    }

    useEffect(()=>{

        getSearchGames();

    },[])

    if(!games){
        return(
            <View style={{flex:1,justifyContent:"center", alignItems:"center", backgroundColor:'#ffffd1'}}>
                <Image source = {require('../../assets/splash.gif')} style={{height: 200 }}/>
            </View>
        )
    }

    return(
        <Container style={{backgroundColor:'#353b52'}}>
            <View style={{flex:0.50,zIndex:-2, position:'absolute'}}>
                <Image source ={require("../../assets/wallpaper.png")} style={{height:height}}/>
            </View>
            {!games.length>=1 ? <View><Image source = {require('../../assets/tenor.gif')} style={{height:height, width:width}}/></View>:<View></View>}
            <ScrollView>
                {games.map((element,key)=>(
                    ( key % 2 === 0 ) ?
                    (<TouchableOpacity key={key} onPress={()=> navigation.navigate("gameInfoScreen",{name: element.name,id: element.id, pantalla})}>
                        <Card style={styles.contenido}>
                            <CardItem style={styles.contenido2}>
                                <Left>
                                    <Body style={{alignItems:"flex-start"}}>
                                        <H3 style={{color:'#ffffff'}}>{element.name}</H3>
                                    </Body>
                                </Left>
                                <Image 
                                    source = { 
                                    element.cover ? ( {uri:`${apiImageUrl}${apiImageSize}${element.cover.image_id}.jpg`})
                                    : require("../../assets/control1.png")}
                                    style={element.cover ? styles.gameCover : styles.ImageNotFound}
                                />
                            </CardItem>
                        </Card>
                    </TouchableOpacity>)
                :
                    (<TouchableOpacity key={key} style={{backgroundcolor:'#000'}} onPress={()=> navigation.navigate("gameInfoScreen",{name: element.name,id: element.id, pantalla})}>
                        <Card style={styles.contenido}>
                            <CardItem style={styles.contenido2}>
                                <Image 
                                    source = { 
                                    element.cover ? ( {uri:`${apiImageUrl}${apiImageSize}${element.cover.image_id}.jpg`})
                                    : require("../../assets/control1.png")}
                                    style={element.cover ? styles.gameCover : styles.ImageNotFound}
                                />
                                <Left>
                                    <Body style={{alignItems:"flex-start"}}>
                                        <H3 style={{color:'#ffffff'}}>{element.name}</H3>
                                    </Body>
                                </Left>
                            </CardItem>
                        </Card>
                    </TouchableOpacity>)
                ))}
            </ScrollView>
        </Container>
    )

}

const styles = StyleSheet.create({

    gameCover:{
        marginTop:'-20%',
        borderRadius:10,
        width: width*0.2,
        height:height*0.2,
        resizeMode:"contain"
    },
    ImageNotFound:{
        width :width*0.2,
        height: height*0.09,
        resizeMode:"contain"
    }, 
    contenido:{
        borderRadius:10,
        flex:1,
        marginTop:'10%',
        marginLeft:'3%',
        marginRight:'3%'
    },
    contenido2:{
        backgroundColor:'#1c2134',
        borderRadius:10
    }
});


export default searchResults;