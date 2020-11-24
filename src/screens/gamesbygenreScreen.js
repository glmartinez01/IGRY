import React, { useEffect, useState } from "react";
import {Header,Container, View,Spinner,Card,CardItem,Body, Thumbnail, Left, H3 } from "native-base";
import { Text,Dimensions,FlatList,Image,StyleSheet } from "react-native";
import backend from "../api/backend";
import getEnvVars from "../../environment";
import { TouchableOpacity } from "react-native-gesture-handler";


const pantalla = 3;
const {width, height} = Dimensions.get("window");
const {apiKey,apiUrl,apiAuthorization,apiImageUrl,apiImageSize} = getEnvVars();


const gamesbygenreScreen=({route,navigation})=>{

    const {id} = route.params;
    const [gamesgenre,setGamesGenre] = useState(null);
    const [error,setError] = useState(false);

    const getGamesGenres = async() => {

        try {
            const response = await backend.post(`games/?`,`fields name,rating,cover.*,platforms.*;where genres = ${id} & rating >=70;limit 20;`,{

                headers:{   'Client-ID':`${apiKey}`,
                            'Authorization':`${apiAuthorization}`}
                        
            });

            setGamesGenre(response.data);
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
                    numColumns={2}
                    style={{borderRadius:1}}
                    data={gamesgenre}
                    keyExtractor={(item)=>item.id.toString()}
                    ListEmptyComponent={
                        <View style={{justifyContent: "center", alignItems: "center", height: height}}>
                            <Text style={{justifyContent: "center", alignItems: "center", fontSize: 20,}}>
                            No games found!
                            </Text>
                        </View>
                    }

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
                    }}
            />
        </Container>
    );
};

const styles = StyleSheet.create({
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

export default gamesbygenreScreen;