import React, { useEffect, useState } from "react";
import {Dimensions, FlatList, StyleSheet,Text, View,Image,Keyboard} from "react-native";
import {Container,Header,Input,Item,Right,Icon,Left,Card,CardItem, Badge} from "native-base";
import backend from "../api/backend";
import getEnvVars from "../../environment";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';
//import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
//import { color } from "react-native-reanimated";
//import changeNavigationBarColor, { hideNavigationBar } from "react-native-navigation-bar-color";
//import timeStamp from "../../timestamp";

const pantalla = 1;
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

    // const setNavigationColor = async () => {
    //     try{
    //         const response = await changeNavigationBarColor('translucent', true,false);
    //         console.log(response)// {success: true}
    //     }catch(e){
    //         console.log(e)// {success: false}
    //     }
      
    // }

    const getGames = async() => {
        try {
            const response = await backend.post(`games/`,`fields name,rating,cover.*;limit 20;search "mario";where rating >=90;`,{

                headers:{   'Client-ID':`${apiKey}`,
                            'Authorization':`${apiAuthorization}`}
                        
            });
            setGames(response.data);
        } catch (error) {
            setError(true);
            
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
            navigation.navigate('searchResults',{search});
            setSearch("");
            setSearchError(false);
        }
    }

    useEffect(()=>{

        getGames();
        //setNavigationColor();

    },[])

    useEffect(() => {
        if (search) setSearchError(false)
    }, [search]);

    if(!games){
        return(
            <View style={{flex:1,justifyContent:"center", alignItems:"center", backgroundColor:'#ffffd1'}}>
                <Image source = {require('../../assets/pac.gif')} style={{height: 200 }}/>
            </View>
        )
    }

    return( 
            
            <Container style={{backgroundColor:'#ffffd1'}}> 
                    
                    <Header searchBar rounded style={{backgroundColor:'#1c2134'}} androidStatusBarColor={'#121521'}>
                        <Icon name="search" style={searchError ? {color:'#ff0000',marginTop:13} : {color:'#b9da00',marginTop:13}}/>
                        <Item style={{backgroundColor:'#121521',marginLeft:5}}>
                            <Input placeholder="Buscar" value={search} onChangeText={setSearch} placeholderTextColor={searchError?'#ff0000':'#b9da00'} style={{color:'#b9da00'}}/>
                            <AntDesign name="rightcircle" size={24} style={searchError?{color:'#ff0000',marginRight:5}:{color: '#b9da00',marginRight:5}} onPress={handlerSearch}/>
                        </Item>
                    </Header>
                    
                    
                    <FlatList
                        numColumns={2}
                        style={{borderRadius:1}}
                        data={games}
                        keyExtractor={(item)=>item.id.toString()}
                        ListEmptyComponent={<Text>No games found!</Text>}

                        renderItem={({item}) => {
                                return(
                                    <View style={{flex:1, alignItems:"center"}}>
                                        <TouchableOpacity onPress={()=> navigation.navigate("gameInfoScreen",{name: item.name,id: item.id, pantalla})}>
                                            <Card style={styles.gallery}>
                                                <CardItem style={{backgroundColor:'#121521',borderRadius:10,flex:1,zIndex:-2}}>
                                                    <Image 
                                                        source = { item.cover ? ( {uri:`${apiImageUrl}${apiImageSize}${item.cover.image_id}.jpg`})
                                                        : require("../../assets/control1.png")} style={item.cover ? styles.gameCover : styles.ImageNotFound}
                                                    />
                                                </CardItem>
                                                <CardItem style={{height:50,backgroundColor:'#1c2134',borderRadius:10,width:width*0.45}}>
                                                    <Text style={{color:'#fff'}}>{ ((item.name).length > 20) ? 
                                                            (((item.name).substring(0,20-3)) + '...') : 
                                                            item.name }
                                                    </Text>
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
        height:185,
        margin:-17,
        marginTop:29,
        borderRadius:10,
        resizeMode:"cover"
        
    },
    searchInput:{
        flex:1,
        flexDirection:"row",
        marginTop:10,
        marginRight:15
    },
    ImageNotFound:{
        width: width*0.2,
        height:height*0.5,
        resizeMode:"contain"
    },
    inputError:{
        
        borderWidth : 2,
        color:'#b9da00',
        backgroundColor:'#121521',
        marginLeft:5
    },
    gallery:{
        borderColor:'#fff',
        backgroundColor:'#121521',
        borderWidth:3, 
        borderRadius:10, 
        height:height*0.27, 
        width:width*0.45,
        marginLeft:20,
        marginRight:20,
        marginTop:10,
        marginBottom:10,
        alignItems:'center'

    },
    
})

export default MovieListScreen;