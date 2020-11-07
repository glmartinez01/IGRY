import React, { useEffect, useState } from "react";
import {Header,Container, View,Spinner} from "native-base";
import { Text,Dimensions } from "react-native";
import backend from "../api/backend";
import getEnvVars from "../../environment";

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
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <Text>Pantalla de Generos</Text>
            </View>
        </Container>

    );
};

export default genresScreen;