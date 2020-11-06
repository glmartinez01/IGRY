import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import MovieListScreen from "./src/screens/MovieListScreen";
import searchResults from "./src/screens/searchResults";
import gameInfoScreen from "./src/screens/gameInfoScreen";
import {Button,Icon} from "native-base";
import {StatusBar} from "react-native";

const Stack = createStackNavigator();

export default function App(){
  return (
    
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name = "Lista de Juegos" component={MovieListScreen} options={{

            headerStyle:{
              backgroundColor:'#63169c',
              borderBottomColor:'#65089e',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign:'center',
            headerLeft: () => (
              <Button
                onPress={() => alert('This is a button!')}
                icon="search"
                color='#ffffff'

              />
            ),

          }}/>
          <Stack.Screen name = "searchResults" component={searchResults} options={{

            title:'Resultados',
            headerTitleAlign:'center',
            headerTintColor:'#ffffff',
            headerStyle:{
              backgroundColor:'#63169c',
              borderBottomColor:'#65089e',
            },

          }}/>
          <Stack.Screen name = "gameInfoScreen" component={gameInfoScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
  )
}
