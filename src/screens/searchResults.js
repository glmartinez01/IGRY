import React, { useEffect, useState } from "react";
import {StyleSheet,View,Text,Dimensions} from "react-native";
import { Container, H1,Spinner,Card,CardItem,Body,H3,Thumbnail, Left } from "native-base";
import backend from "../api/backend";
import { FlatList } from "react-native-gesture-handler";
import getEnvVars from "../../environment"

const {width, height} = Dimensions.get("window");
const {apiKey,apiAuthorization,apiImageUrl,apiImageSize} = getEnvVars();

const searchResults = ({route,navigation}) => {
    const {search} = route.params;
    const [games,setGames] = useState(null);
    const [error,setError] = useState(false);


    const getSearchGames = async () => {
        try {
            const response = await backend.get(`?fields=name,rating,cover.*&search=${search}`,{

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
            <View style={{flex:1,justifyContent:"center"}}>
                <Spinner color="blue"/>
            </View>
        )
    }

    return(
        <Container>
            <H1>Resultados de la Busqueda: {search}</H1>
            <FlatList 
               data={games}
               keyExtractor={(item)=>item.id}
               ListEmptyComponent={<Text>No se han encontrado juegos!</Text>}

               renderItem={({item}) =>{
                   return(
                        <View>
                            <Card>
                                <CardItem cardBody>
                                        <Left>
                                            <Thumbnail 
                                                source = { 

                                                        item.cover ? ( {uri:`${apiImageUrl}${apiImageSize}${item.cover.image_id}.jpg`}): require("../../assets/control.jpg")

                                                } style={item.cover ? styles.gameCover : styles.ImageNotFound}/>
                                            <Body style={{alignItems:"flex-start"}}>
                                                <H3>{item.name}</H3>
                                                <Text>Rating: {item.rating}</Text>
                                            </Body>
                                        </Left>
                                </CardItem>
                            </Card>
                        </View>
                   )
               }}
            
            />

        </Container>
        

    )

}

const styles = StyleSheet.create({

    gameCover:{
        width: 70,
        height:50,
        resizeMode:"contain"
    },
    ImageNotFound:{
        width : 70,
        height: 50
    },

});


export default searchResults;