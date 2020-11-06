import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import MovieListScreen from "./src/screens/MovieListScreen";
import searchResults from "./src/screens/searchResults";
import gameInfoScreen from "./src/screens/gameInfoScreen";
import {Button,Icon} from "native-base";


const Stack = createStackNavigator();

export default function App(){
  return (
    
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name = "Lista de Juegos" component={MovieListScreen} options={{

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
                <Icon name="list"/>
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
