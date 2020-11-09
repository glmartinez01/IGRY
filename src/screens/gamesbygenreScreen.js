import React, { useEffect, useState } from "react";
import {Header,Container, View,Spinner,Card,CardItem,Body, Thumbnail, Left, H3 } from "native-base";
import { Text,Dimensions,FlatList,Image,StyleSheet } from "react-native";
import backend from "../api/backend";
import getEnvVars from "../../environment";
import { TouchableOpacity } from "react-native-gesture-handler";

const {width, height} = Dimensions.get("window");
const {apiKey,apiAuthorization,apiImageUrl,apiImageSize} = getEnvVars();


const gamesbygenreScreen=({route,navigation})=>{

    const {id} = route.params;
    const [gamesgenre,setGamesGenre] = useState(null);
    const [error,setError] = useState(false);


    const getGamesGenres = async() => {
        try {
            const response = await backend.get(`games/?fields=name,rating,cover.*`,
                {
                    headers:{   
                                'Client-ID':`${apiKey}`,
                                'Authorization':`${apiAuthorization}`
                            }, 
                }
                        
            );
            setGamesGenre(response.data);
            //{console.log(response.data)}
        } catch (error) {
            setError(true);
            {console.log(error)};
        }
    }

    useEffect(()=>{

        getGamesGenres();

    },[])

    if(!gamesgenre){
        return(
            <View style={{flex:1,justifyContent:"center", alignItems:"center", backgroundColor:'#ffffd1'}}>
                <Image source = {require('../../assets/splash.gif')} style={{height: 200 }}/>
            </View>
        )
    }

    return(

        <Container style={{backgroundColor:'#ffffd1'}}>
            <FlatList
                    style={{borderRadius:1}}
                    data={gamesgenre}
                    keyExtractor={(item)=>item.id}
                    ListEmptyComponent={<Text>No se han encontrado juegos!</Text>}

                    renderItem={({item}) => {
                        return(
                            <View style={{flex:1, alignItems:"center"}}>
                                <TouchableOpacity onPress={()=> navigation.navigate("gameInfoScreen",{name: item.name,id: item.id})}>
                                    <Card style={{ width:width*0.85,alignContent:"center"}}>
                                        <CardItem style={{backgroundColor:'#1c2134'}}>
                                            <Left>
                                                <Thumbnail source = {item.cover ? ( {uri:`${apiImageUrl}${apiImageSize}${item.cover.image_id}.jpg`})
                                                            : require("../../assets/control1.png")}
                                                            style={{resizeMode:'contain'}}
                                                />
                                                <Body>
                                                    <H3 style={{color:'#ffffff'}}>{item.name}</H3>
                                                </Body>
                                            </Left>
                                        </CardItem>
                                        <CardItem cardBody >
                                                <Body style={{alignItems:"center",backgroundColor:'#1c2134'}}>
                                                    
                                                    <Image 
                                                        source = { item.cover ? ( {uri:`${apiImageUrl}${apiImageSize}${item.cover.image_id}.jpg`})
                                                        : require("../../assets/control1.png")}
                                                        style={item.cover ? styles.gameCover : styles.ImageNotFound}
                                                    />
                                                    
                                                    
                                                </Body>
                                            
                                        </CardItem>
                                    </Card>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                    }
                />
        </Container>

    );

};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    input:{
        margin:15
    },
    gameCover:{
        flex:1,
        width: width*0.85,
        height:height*0.5,
        resizeMode:"contain",
        
    },
    searchInput:{
        flex:1,
        flexDirection:"row",
        marginTop:10,
        marginRight:15
    },
    ImageNotFound:{
        width : width*0.8,
        height:height*0.5,
        resizeMode:"contain"
    },
    
})

export default gamesbygenreScreen;