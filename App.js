import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import MovieListScreen from "./src/screens/MovieListScreen";
import searchResults from "./src/screens/searchResults";
import gameInfoScreen from "./src/screens/gameInfoScreen";
import {Button,Icon} from "native-base";
import { AntDesign } from '@expo/vector-icons';


const Stack = createStackNavigator();

export default function App(){
  return (
    
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name = "gameList" component={MovieListScreen} options={{
            title:'Lista de Juegos',
            headerStyle:{
              backgroundColor:'#1c2134',
              
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign:'center',
            headerLeft: () => (
              <Button icon onPress={()=> {alert('Hola')}} style={{backgroundColor:'#1c2134'}}>
                <AntDesign name="bars" size={35} color='#b9da00' style={{marginLeft:10}}/>
              </Button>
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
