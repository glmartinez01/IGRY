import React, { useEffect, useState } from "react";
import {Header,Container, View,Spinner,Card,CardItem,Body, Thumbnail, Left, H3 } from "native-base";
import { Text,Dimensions,FlatList,Image } from "react-native";
import backend from "../api/backend";
import getEnvVars from "../../environment";
import { TouchableOpacity } from "react-native-gesture-handler";

const array = [
    "./assets/",
    "./assets/",
    "./assets/",
    "./assets/",
    "./assets/",
    "./assets/",
    "./assets/",
    "./assets/",
    "./assets/",
    "./assets/"  
];
const {width, height} = Dimensions.get("window");
const {apiKey,apiAuthorization,apiImageUrl,apiImageSize} = getEnvVars();


const genresScreen = () => {

    const [genres,setGenres] = useState(null);
    const [error,setError] = useState(false);

    const getGenres = async() => {
        try {
            const response = await backend.get(`genres/?fields=*`,{

                headers:{   'Client-ID':`${apiKey}`,
                            'Authorization':`${apiAuthorization}`}
                        
            });
            setGenres(response.data);
            

        } catch (error) {
            setError(true);
            {console.log(error)};
        }
        
    }

    useEffect(()=>{

        getGenres();

    },[])

    if(!genres){
        return(
            <View style={{flex:1,justifyContent:"center"}}>
                <Spinner color="blue"/>
            </View>
        )
    }

    return(
        <Container>
            <FlatList
                        
                        numColumns={2}
                        style={{borderRadius:1}}
                        data={genres}
                        keyExtractor={(item)=>item.id}
                        ListEmptyComponent={<Text>No se han encontrado generos!</Text>}

                        renderItem={({item}) => {
                            return(
                                <View>
                                    <TouchableOpacity>
                                        <Card style={{width:width*0.49}}>
                                            <CardItem style={{justifyContent:"center",alignItems:"center"}}>
                                                    <H3 >{item.name}</H3>
                                            </CardItem>
                                            <CardItem cardBody>
                                                <Body style={{justifyContent:"center",alignItems:"center"}}>
                                                    <Image
                                                        
                                                        source={require('../../assets/logo.png')}
                                                        style={{width:50,resizeMode:'contain'}}
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

export default genresScreen;