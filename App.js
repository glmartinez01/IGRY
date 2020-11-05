import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import MovieListScreen from "./src/screens/MovieListScreen";

const Stack = createStackNavigator();

export default function App(){
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name = "Lista de Juegos" component={MovieListScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
  )
}
