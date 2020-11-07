import React, {useState } from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import MovieListScreen from "./src/screens/MovieListScreen";
import searchResults from "./src/screens/searchResults";
import gameInfoScreen from "./src/screens/gameInfoScreen";
import genresScreen from "./src/screens/genresScreen";
import {Button,Icon} from "native-base";
import { AntDesign,MaterialIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { color } from "react-native-reanimated";

let names = "";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function drawer(){

  return(
    
      <Drawer.Navigator initialRouteName="gameList" drawerStyle={{backgroundColor:'#1c2134'}} drawerContentOptions={{

        inactiveTintColor:'#ffffff'
      }}>
        <Drawer.Screen name="gameList" component={MovieListScreen} options={{
          title:'Lista de Juegos',

        }} />
        <Drawer.Screen name="Genres" component={genresScreen} options={{
          title:'Generos'
        }}/>
      </Drawer.Navigator>


  );

}


export default function App(){
  return (
    
      <NavigationContainer>
        
        <Stack.Navigator>
          <Stack.Screen name = "Home" component={drawer} options={{
            title:`API`,
            headerStyle:{
              backgroundColor:'#1c2134',
              
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign:'center',
            
            headerLeft: () => (
              <MaterialIcons name="videogame-asset" size={35} color='#ffffff' style={{marginLeft:10}}/>
            ),

          }}/>
          <Stack.Screen name = "searchResults" component={searchResults} options={{

            title:'Resultados',
            headerTitleAlign:'center',
            headerTintColor:'#ffffff',
            headerStyle:{
              backgroundColor:'#1c2134',
            },

          }}/>
          <Stack.Screen name = "gameInfoScreen" component={gameInfoScreen} options={{
              title:"Información",
              headerTitleAlign:"center"
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
      
  )
}
