import React, { useEffect, useState } from "react";
import {Dimensions, FlatList, StyleSheet,Text, View,Image,StatusBar,Keyboard} from "react-native";
import { Spinner,Button, Container, Body,Header,Input,Item,Right,Icon,Left,Card,CardItem, H3, Thumbnail} from "native-base";
import backend from "../api/backend";
import getEnvVars from "../../environment";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
//import timeStamp from "../../timestamp";


const {width, height} = Dimensions.get("window");
const {apiKey,apiAuthorization,apiImageUrl,apiImageSize} = getEnvVars();
//var ts = 1;//new Date().getTime();
//const ts = Number(new Date());
//var message = ts.toString()+privKey+apiKey;


//Variable que contiene la pantalla renderizar

const MovieListScreen = ({navigation}) => {

    const [games,setGames] = useState(null);
    const [error,setError] = useState(false);
    const [search,setSearch] = useState("");
    const [searchError,setSearchError] = useState(false);

    const getGames = async() => {
        try {
            const response = await backend.get(`games/?fields=name,rating,cover.*`,{

                headers:{   'Client-ID':`${apiKey}`,
                            'Authorization':`${apiAuthorization}`}
                        
            });
            setGames(response.data);
        } catch (error) {
            setError(true);
            throw error;
        }
        
        
    }
    
    const handlerSearch = () => {
        if(!search)  {
            setSearchError(true);
            Keyboard.dismiss(); 
        }
        else
        {
            Keyboard.dismiss(); 
            navigation.navigate('searchResults',{search})
            setSearchError(false)
        }
    }

    useEffect(()=>{

        getGames();

    },[])

    useEffect(() => {
        if (search) setSearchError(false)
    }, [search]);

    if(!games){
        return(
            <View style={{flex:1,justifyContent:"center", alignItems:"center", backgroundColor:'#ffffd1'}}>
                <Image source = {require('../../assets/splash.gif')} style={{height: 200 }}/>
            </View>
        )
    }

    return( 
       
            <Container style={{backgroundColor:'#ffffd1'}}> 
                    
                    <StatusBar hidden={true}/>
                    
                    <Header searchBar rounded style={{backgroundColor:'#1c2134'}}>
                        <Item style={{backgroundColor:'#1c2134'}}>
                            <Icon name="search" style={searchError ? {color:'#ff0000'} : {color:'#b9da00'}}/>
                            <Input placeholder="Buscar" value={search} onChangeText={setSearch} placeholderTextColor={'#b9da00'} style={searchError ? styles.inputError : {color:'#b9da00'}}/>
                            <AntDesign name="rightcircle" size={24} style={{color: '#b9da00'}} onPress={handlerSearch}/>
                        </Item>
                    </Header>
                    
                    
                    <FlatList
                        style={{borderRadius:1}}
                        data={games}
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
    inputError:{
        borderColor : "#ff0000",
        borderWidth : 2,
    }
    
})

export default MovieListScreen;