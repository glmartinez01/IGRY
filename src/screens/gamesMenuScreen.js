import React, { useEffect, useState } from "react";
import {Dimensions, FlatList, StyleSheet,Text, View,Image,Keyboard} from "react-native";
import {Container,Header,Input,Item,Right,Icon,Left,Card,CardItem, Badge} from "native-base";
import backend from "../api/backend";
import getEnvVars from "../../environment";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';

/*
Docs
https://stackoverflow.com/questions/30594080/how-to-have-ellipsis-effect-on-text
*/

const pantalla = 1;
const {width, height} = Dimensions.get("window");
const {apiKey,apiAuthorization,apiImageUrl,apiImageSize} = getEnvVars();

const MovieListScreen = ({navigation}) => {

    const [games,setGames] = useState(null);
    const [error,setError] = useState(false);
    const [search,setSearch] = useState("");
    const [searchError,setSearchError] = useState(false);

    const getGames = async() => {
        try {
            const response = await backend.post(`games/`,`fields name,rating,cover.*;limit 20;where rating >= 90;`,{

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
                            <Input placeholder="Search" value={search} onChangeText={setSearch} placeholderTextColor={searchError?'#ff0000':'#b9da00'} style={{color:'#b9da00'}}/>
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
                                                <Image 
                                                    source = { item.cover ? ( {uri:`${apiImageUrl}${apiImageSize}${item.cover.image_id}.jpg`})
                                                    : require("../../assets/control1.png")} style={item.cover ? styles.gameCover : styles.ImageNotFound}
                                                />
                                                <Text style={styles.texto}>
                                                    { ((item.name).length > 20) ? 
                                                    (((item.name).substring(0,20-3)) + '...') 
                                                    :item.name }
                                                </Text>
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
    input:{
        margin:15
    },
    gameCover:{
        width:width*0.449,
        height:height*0.2695,
        borderRadius:10,
        resizeMode:"cover",
        zIndex:-2,
        position:'absolute',
    },
    ImageNotFound:{
        flex:1,
        height:height*0.2,
        width: width*0.4,
        borderRadius:10,
        resizeMode:"contain",
        zIndex:-2,
        position:'absolute',
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
        alignItems:'center',
    },
    texto:{
        color:'#fff',
        backgroundColor:'rgba(18,21,33,0.8)',
        color:'#fff',
        zIndex:-1,
        position:'absolute',
        top:'70%',
        paddingTop:5,
        paddingBottom:5,
        paddingRight:5,
        paddingLeft:5
    },
    
})

export default MovieListScreen;