import React, { useEffect, useState } from "react";
import {Header,Container, View} from "native-base";
import { Text,Dimensions,FlatList,Image } from "react-native";
import backend from "../api/backend";
import getEnvVars from "../../environment";
import GradientButton from 'react-native-gradient-buttons';


const {width, height} = Dimensions.get("window");
const {apiKey,apiAuthorization} = getEnvVars();


const genresScreen = ({navigation}) => {

    const [genres,setGenres] = useState(null);
    const [error,setError] = useState(false);

    const getGenres = async() => {
        try {
            const response = await backend.post(`genres/`,`fields *;limit 23;`,{

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
            <View style={{flex:1,justifyContent:"center", alignItems:"center", backgroundColor:'#ffffd1'}}>
                <Image source = {require('../../assets/splash.gif')} style={{height: 200 }}/>
            </View>
        )
    }

    return(
        <Container style={{backgroundColor:'#000022'}}>
            <FlatList
                        
                numColumns={2}
                data={genres}
                keyExtractor={(item)=>item.id}
                ListEmptyComponent={<Text>No genres found!</Text>}

                renderItem={({item}) => {
                    return(
                        <View style={{flex: 1, justifyContent: "space-evenly", alignItems: 'center', marginVertical: 10}}>    
                            <GradientButton gradientBegin="#007a7c" gradientEnd="#0d4b56" 
                                        text={item.name.includes('(') ? 
                                        item.name.split('(')[1].substring(0,((item.name.split('(')[1]).length)-1):((item.name).length > 15) ? 
                                        (((item.name).substring(0,20-10)) + '...') 
                                        :item.name} width='90%' impact onPressAction={()=> navigation.navigate("gamesbygenreScreen",{id:item.id, name:item.name})}/>
                        </View>
                    )
                }}
            />
        </Container>

    );
};

export default genresScreen;