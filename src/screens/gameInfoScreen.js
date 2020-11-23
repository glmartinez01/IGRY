import React, { useEffect, useState } from "react";
import {StyleSheet,Image,Dimensions,ScrollView,TouchableHighlight} from "react-native";
import {Content, H3, Text,View,Spinner, Body, Header, Thumbnail, Card, CardItem, Left, Container,Icon, Badge, Button, Right, Row} from "native-base";
import getEnvVars from "../../environment";
import backend from "../api/backend";
import Circulos from "../obj/circulos"
import Carousel from 'react-native-looped-carousel';
import { AntDesign } from '@expo/vector-icons';
import GradientButton from 'react-native-gradient-buttons';

const {apiKey,apiAuthorization,apiImageUrl,apiSSSize,apiImageSize} = getEnvVars();
const {width, height} = Dimensions.get("window");

/*
Docs
https://github.com/phil-r/react-native-looped-carousel
https://reactnativeexample.com/a-customizable-and-haptic-gradient-button-library-for-react-native/
*/

const gameInfoScreen = ({route,navigation}) => {

    const {name,id,pantalla} = route.params;
    const [game,setGame] = useState(null);
    const [error,setError] = useState(false);

    const getGameInfo = async () =>{
        try {
            try {
                const response = await backend.get(`games/?fields=id,screenshots.*,summary,cover.*,rating,platforms.*&search=${name}`,{
    
                    headers:{   'Client-ID':`${apiKey}`,
                                'Authorization':`${apiAuthorization}`}, 
                });
                setGame(response.data);
            } catch (error) {
                setError(true);
            }
        } catch (error) {
            
        }
    }
    
    let screenRoute = "";
    if(pantalla===1){
        screenRoute = "gameList"
    }
    if(pantalla===2){
        screenRoute = "searchResults"
    }
    if(pantalla===3){
        screenRoute = "gamesbygenreScreen"
    }

    useEffect(()=>{

        getGameInfo();

    },[])

    if(!game){
        return(
            <View style={{flex:1,justifyContent:"center", alignItems:"center", backgroundColor:'#ffffd1'}}>
                <Image source = {require('../../assets/mario2.gif')} style={{height: 250 }}/>
            </View>
        )
    }
    

    return(
        <Container style={{flex:1, backgroundColor:'#ffffd1'}}>
            
                <View style={{flex:0.55, alignItems: 'center', justifyContent: 'center',zIndex:-1, position:'absolute'}}>
                    <Carousel
                            style={styles.carusel}
                            autoplay={true}
                            delay={2000}
                        >
                        {game[0].screenshots ? game[0].screenshots.map((element,key)=>(
                            <Image 
                                key={key} 
                                style={styles.gameCover1} 
                                source={{uri: `${apiImageUrl}${apiSSSize}${element.image_id}.jpg`}} 
                            />
                        )): <Image source ={require("../../assets/control1.png")}style = {styles.ImageNotFound}/>}   
                    </Carousel>
                </View>
                <View style={{flex:0.50,zIndex:-2, position:'absolute'}}>
                    <Image source ={require("../../assets/wallpaper.png")} style={{height:height}}/>
                </View>
                <ScrollView
                    vertical={true}
                    showsVerticalScrollIndicator={false}
                    style={{flex:1}}
                >
                    <Card style={styles.vertical}>
                        <Image source={game[0].cover ? ( {uri:`${apiImageUrl}${apiImageSize}${game[0].cover.image_id}.jpg`}): require("../../assets/control1.png") }
                                style = {styles.gameCover} />
                        <H3 style={{color:'#000000',textAlign:'center'}}>{name}</H3>
                        <CardItem>
                            <Text style={{fontSize:20}}>Rating:</Text>
                            <View >
                                <Circulos percentage={game[0].rating ? game[0].rating: 0 } color={'#b9da00'} delay={600} max={100}/>
                            </View>
                        </CardItem>
                        <CardItem>
                            <Text style={{fontSize:19}}>Platforms: </Text>
                            <View style={{alignSelf:'center', alignContent:'center'}}>
                                
                                {game[0].platforms ? game[0].platforms.map((element,key)=>(
                                    <Badge key={key} style={{backgroundColor:'#b9da00'}}>
                                        
                                        <Text>{
                                            element.name.includes('(') ? 
                                            element.name.split('(')[1].substring(0,((element.name.split('(')[1]).length)-1) 
                                            : element.name
                                        }</Text>
                                    
                                    </Badge>
                                )):<Text>?</Text>} 
                                
                            </View>
                        </CardItem>
                    </Card>
                    <Card style={styles.v1}>
                        <CardItem style={{borderRadius:10}}>
                            <Text style={{color:'#000000',alignContent:"center",fontSize:20}}>
                                Summary: {game[0].summary ? game[0].summary:`Description not available!`}
                            </Text>
                        </CardItem>
                    </Card>
                    {game[0].screenshots?
                    
                    <View style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center', marginVertical: 24}}>
                        <GradientButton text="ArtWorks" width='90%' blueMarine impact onPressAction={()=>navigation.navigate("artWorkScreen",{id:game[0].id,name:name,screens:game[0].screenshots})}/>
                    </View>
                    
                    :
                    
                    <View style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center', marginVertical: 24,opacity:0.5}}>
                        <GradientButton text="ArtWorks" width='90%' blueMarine impact />
                    </View>

                    }
                   
                </ScrollView>
            <TouchableHighlight onPress={() => navigation.navigate(screenRoute)} style={styles.icono}>
                 <AntDesign name="leftcircle" size={30} style={{color:'#dde3ed',marginRight:5}}/>
            </TouchableHighlight>
            
        </Container>

    );
}

const styles = StyleSheet.create({
    carusel:{
        width: width,
        height:height*0.35,
        flexDirection:'row', 
        justifyContent:'flex-start',
        alignSelf:'flex-start'
    },
    gameCover1:{
        width: width,
        height:height*0.35,
    },
    gameCover:{
        width: width*0.50,
        height:height*0.30,
        resizeMode:"contain",
        marginTop:'-15%',
        borderRadius:10
    },
    ImageNotFound:{
        width: width,
        height:height*0.35,
        resizeMode:"contain"
    },
    icono:{
        position:'absolute',
        marginLeft:10,
        marginTop:10,
        borderRadius:10,
        height:height*0.05,
        zIndex:2
    },
    vertical:{
        borderColor:'#fff',
        backgroundColor:'#fff',
        borderWidth:3, 
        borderRadius:10,  
        marginLeft:20,
        marginRight:20,
        marginTop:200,
        marginBottom:10,
        alignItems:'center',
    },
    v1:{
        borderColor:'#fff',
        backgroundColor:'#fff',
        borderWidth:3, 
        borderRadius:10, 
        marginLeft:20,
        marginRight:20,
        marginTop:20,
        marginBottom:10,
        alignItems:'center',
        justifyContent:'center',
        flex:1
    },
});


export default gameInfoScreen;