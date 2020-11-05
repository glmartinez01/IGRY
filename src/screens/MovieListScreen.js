import React, { useEffect, useState } from "react";
import {Dimensions, FlatList, StyleSheet,Text, View,Image} from "react-native";
import { Spinner,Button, Container, Form, Body,H1,Header,Input,Item, Left, Right,Icon,Card,CardItem, H3, Thumbnail } from "native-base";
import backend from "../api/backend";
import getEnvVars from "../../environment";
import { TouchableOpacity } from "react-native-gesture-handler";
//import timeStamp from "../../timestamp";
//import * as Crypto from 'expo-crypto';

const {width, height} = Dimensions.get("window");
const {apiKey,apiAuthorization,apiImageUrl,apiImageSize} = getEnvVars();
//var ts = 1;//new Date().getTime();
//const ts = Number(new Date());
//var message = ts.toString()+privKey+apiKey;
//const hash = Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.MD5,message);


//Variable que contiene la pantalla renderizar

const MovieListScreen = ({navigation}) => {

    const [games,setGames] = useState(null);
    const [error,setError] = useState(false);
    const [search,setSearch] = useState("");

    const getGames = async() => {
        try {
            const response = await backend.get(`?fields=name,rating,cover.*`,{

                headers:{   'Client-ID':`${apiKey}`,
                            'Authorization':`${apiAuthorization}`}
                        
            });
            setGames(response.data);
            

        } catch (error) {
            setError(true);
            
        }
        
    }

    useEffect(()=>{

        getGames();

    },[])

    if(!games){
        return(
            <View style={{flex:1,justifyContent:"center"}}>
                <Spinner color="blue"/>
            </View>
        )
    }

    return( 
        <Container> 
                <Header searchBar>
                    <Item>
                        <Input placeholder = "Buscar" value={search} onChangeText={setSearch}/>
                    </Item>
                    <Right>
                        <Button icon onPress={() => {navigation.navigate('searchResults',{search})}}>
                            <Icon name="search"/>
                        </Button>
                    </Right>
                </Header>
                
                
                <FlatList
                    data={games}
                    keyExtractor={(item)=>item.id}
                    ListEmptyComponent={<Text>No se han encontrado juegos!</Text>}

                    renderItem={({item}) => {
                        return(
                            <View>
                                <TouchableOpacity onPress={()=> navigation.navigate("gameInfoScreen")}>
                                    <Card>
                                        <CardItem cardBody>
                                                <Body style={{alignItems:"flex-start"}}>
                                                    
                                                    <Image 
                                                        source = { 

                                                                item.cover ? ( {uri:`${apiImageUrl}${apiImageSize}${item.cover.image_id}.jpg`}): require("../../assets/control.jpg")
            
                                                        } style={item.cover ? styles.gameCover : styles.ImageNotFound}/>
                                                    <H3>{item.name}</H3>
                                                    <Text>Rating: {item.rating}</Text>
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
        width: width*0.99,
        height:height*0.5,
        resizeMode:"contain"
    },
    searchInput:{
        flex:1,
        flexDirection:"row",
        marginTop:10,
        marginRight:15
    },
    ImageNotFound:{
        width : width*0.99,
        height:height*0.5,
        resizeMode:"contain"
    },
    
})

export default MovieListScreen;