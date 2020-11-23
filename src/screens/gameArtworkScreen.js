import React,{Component, useEffect,useState} from "react";
import getEnvVars from "../../environment";
import {Dimensions, Image,Text,FlatList} from "react-native";
import { Container, View } from "native-base";
import backend from "../api/backend";
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from "react-native-gesture-handler";

/*
Docs
https://github.com/oblador/react-native-animatable
*/

const {apiKey,apiAuthorization,apiImageUrl,apiImageSize} = getEnvVars();
const {width, height} = Dimensions.get("window");

class AnimatedImages extends Component{

    render(){
        return(
            <Animatable.View animation="zoomIn" style={{flex:1, alignItems:"center",marginTop:0}}>
                {this.props.children}
            </Animatable.View>
        );   
    }

}

const artWorkScreen = ({route,navigation}) => {

    const {id,name,screens} = route.params;
    const [artW,setArtW] = useState(null);
    const [error,setError] = useState(false);

    const getArtWork = async () =>{
        
        try {
            const response = await backend.post(`artworks/`,`fields *;where game=${id};`,{

                headers:{   'Client-ID':`${apiKey}`,
                            'Authorization':`${apiAuthorization}`},
                            
            });
            setArtW(response.data);
           
        } catch (error) {
            setError(true);
        }
        
    }

    useEffect(()=>{

        getArtWork();

    },[])

    if(!artW){
        return(
            <View style={{flex:1,justifyContent:"center", alignItems:"center", backgroundColor:'#ffffd1'}}>
                <Image source = {require('../../assets/mario2.gif')} style={{height: 250 }}/>
            </View>
        )
    }

    return(
        <Container style={{backgroundColor:'#ffffd1'}}>
            {!artW.length>=1 ? 
            <FlatList
            horizontal={false}
            numColumns={3}
            style={{borderRadius:1}}
            data={screens}
            keyExtractor={(item)=>item.id.toString()}
            ListEmptyComponent={<Text>No images found!</Text>}

            renderItem={({item}) => {
                    return(
                        <TouchableOpacity onPress={()=>navigation.navigate("simageScreen",{id:item.id})}>
                            <AnimatedImages index={item.id}>
                                
                                <Image  source={{uri:`${apiImageUrl}${apiImageSize}${item.image_id}.jpg`}}
                                        style={{height:height/3,width:width/3}}/>
                                
                            </AnimatedImages>
                        </TouchableOpacity>
                    )
                }
            }
            />
            :
            <FlatList
                        horizontal={false}
                        numColumns={3}
                        style={{borderRadius:1}}
                        data={artW}
                        keyExtractor={(item)=>item.id.toString()}
                        ListEmptyComponent={<Text>No images found!</Text>}

                        renderItem={({item}) => {
                                return(
                                    <TouchableOpacity onPress={()=>navigation.navigate("imageScreen",{id:item.id})}>
                                        <AnimatedImages index={item.id}>
                                            
                                            <Image  source={{uri:`${apiImageUrl}${apiImageSize}${item.image_id}.jpg`}}
                                                    style={{height:height/3,width:width/3}}/>
                                            
                                        </AnimatedImages>
                                    </TouchableOpacity>
                                )
                            }
                        }
            />
            }
            
        </Container>
    );
}


export default artWorkScreen;