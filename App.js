import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import MovieListScreen from "./src/screens/MovieListScreen";
import searchResults from "./src/screens/searchResults";

const Stack = createStackNavigator();

export default function App(){
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name = "Lista de Juegos" component={MovieListScreen}/>
          <Stack.Screen name = "searchResults" component={searchResults}/>
        </Stack.Navigator>
      </NavigationContainer>
  )
}
