import React, { useEffect, useState } from "react";
import {StyleSheet,Image,Dimensions,ScrollView,TouchableHighlight} from "react-native";
import {Content, H3, Text,View,Spinner, Body, Header, Thumbnail, Card, CardItem, Left, Container,Icon} from "native-base";
import getEnvVars from "../../environment";
import backend from "../api/backend";
import { ceil, log } from "react-native-reanimated";
import Circulos from "../obj/circulos"

const {apiKey,apiAuthorization,apiImageUrl,apiImageSize} = getEnvVars();
const {width, height} = Dimensions.get("window");

const gameInfoScreen = ({route,navigation}) => {

    const {name,id,pantalla} = route.params;
    const [game,setGame] = useState(null);
    const [error,setError] = useState(false);

    const getGameInfo = async () =>{
        try {
            try {
                const response = await backend.get(`games/?fields=screenshots.*,summary,cover.*,rating,platforms.*&search=${name}`,{
    
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
                <Image source = {require('../../assets/splash.gif')} style={{height: 200 }}/>
            </View>
        )
    }
    

	
    return(
        <Container style={{flex:1, backgroundColor:'#ffffd1'}}>
            
                <View style={{flex:0.55, alignItems: 'center', justifyContent: 'center',zIndex:-1, position:'absolute'}}>
                    <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            
                            <View style={{flexDirection:'row', justifyContent:'flex-start',flexWrap:'wrap',alignSelf:'flex-start'}}>
                                {game[0].screenshots ? game[0].screenshots.map((element,key)=>(
                                    <Image 
                                    key={key} 
                                    style={styles.gameCover1} 
                                    source={{uri: `${apiImageUrl}${apiImageSize}${element.image_id}.jpg`}} 
                                    />
                                )): require("../../assets/control1.png")} 
                                
                            </View>
                    </ScrollView>
                </View>

                <ScrollView
                    vertical={true}
                    showsVerticalScrollIndicator={false}
                    style={{flex:1, marginTop:170}}
                >
                    <Card style={styles.vertical}>
                        <Image source={game[0].cover ? ( {uri:`${apiImageUrl}${apiImageSize}${game[0].cover.image_id}.jpg`}): require("../../assets/control1.png") }
                                style = {styles.gameCover} />
                        <H3 style={{color:'#000000',textAlign:'center'}}>{name}</H3>
                        <CardItem style={{flexDirection:'row', justifyContent:'flex-start',flexWrap:'wrap',alignSelf:'flex-start'}}>
                            <View >
                                <Circulos percentage={game[0].rating ? game[0].rating: 0 } color={'#b9da00'} delay={600} max={100}/>
                            </View>
                            <View style={{ustifyContent:'flex-start',flexWrap:'wrap',alignSelf:'center', alignContent:'center'}}>
                                {game[0].platforms.map((element,key)=>(<Text key={key} style={{fontSize:19,color:'#000',textAlign:"center"}}>{element.name}</Text>))}
                            </View>
                        </CardItem>
                        <CardItem>
                            <Text style={{fontSize:20}}>Rating</Text>
                            <Text style={{fontSize:19}}>Platforms</Text>
                        </CardItem>  
                    </Card>
                    <Card style={styles.v1}>
                        <CardItem style={{borderRadius:10}}>
                            <Text style={{color:'#000000',alignContent:"center",fontSize:20}}>
                                Summary: {game[0].summary ? game[0].summary:`Description not available!`}
                            </Text>
                        </CardItem>
                    </Card>
                </ScrollView>
            <TouchableHighlight onPress={() => navigation.navigate(screenRoute)} style={styles.icono}>
                    <View>
                        <Icon name="arrow-back" style={{color:"#000000",width:30}} />
                    </View>
            </TouchableHighlight>
            
        </Container>

    );
}

const styles = StyleSheet.create({
    header:{
        flex:1,
        height:height*0.5,
        width:width*0.98,
    
    },
    gameCover1:{
        width: width,
        height:height*0.35
    },
    gameCover:{
        width: width*0.50,
        height:height*0.30,
        resizeMode:"contain"
    },
    ImageNotFound:{
        width : 70,
        height: 50,
        resizeMode:"contain"
    },
    icono:{
        position:'absolute',
        marginLeft:10,
        marginTop:10,
        zIndex:2
    },
    vertical:{
        borderColor:'#fff',
        backgroundColor:'#fff',
        borderWidth:3, 
        borderRadius:10, 
        height:height*0.7, 
        marginLeft:20,
        marginRight:20,
        marginTop:30,
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
        marginTop:30,
        marginBottom:10,
        alignItems:'center',
        justifyContent:'center',
        flex:1
    },
});


export default gameInfoScreen;