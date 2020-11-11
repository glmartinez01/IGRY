import React, {useState } from "react";
import {NavigationContainer,DrawerActions} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import MovieListScreen from "./src/screens/MovieListScreen";
import searchResults from "./src/screens/searchResults";
import gameInfoScreen from "./src/screens/gameInfoScreen";
import genresScreen from "./src/screens/genresScreen";
import gamesbygenreScreen from "./src/screens/gamesbygenreScreen";
import {Image} from "react-native";
import { AntDesign ,MaterialIcons,Entypo } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Button} from "native-base";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function drawer(){

  return(
    
      <Drawer.Navigator initialRouteName="gameList" drawerPosition={"right"} drawerStyle={{backgroundColor:'#1c2134'}} drawerContentOptions={{

        inactiveTintColor:'#ffffff'
      }}>
        <Drawer.Screen name="gameList" component={MovieListScreen} options={{
          title:'Juegos',

        }} />
        <Drawer.Screen name="Genres" component={genresScreen} options={{
          title:'Generos'
        }}/>
      </Drawer.Navigator>


  );

}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="gameList" component={MovieListScreen} options={{
          title:'Games',
          tabBarIcon:({color,size}) =>(
            <Image source={require("./assets/tab1.png")} style={{height:30,width:25}}/>
          ),

        }} />
        <Tab.Screen name="Genres" component={genresScreen} options={{
          title:'Genres',
          tabBarIcon:({color,size}) =>(
            <Image source={require("./assets/tab2.png")} style={{height:39,width:25}}/>
          ),
        }}/>
    </Tab.Navigator>
  );
}


export default function App(){
  return (
    
      <NavigationContainer>
        
        <Stack.Navigator>
          <Stack.Screen name = "Home" component={MyTabs} options={
            
            ({ route }) => ({

            title:'IGRY',

            headerStyle:{
              backgroundColor:'#1c2134',
              
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign:'center',
            
            headerLeft: () => (
              <Image
                style={{margin:10, width: 60, resizeMode:"contain"}}
                source={require('./assets/logo.png')}
              />
            ),

          })}
          />
          <Stack.Screen name = "searchResults" component={searchResults} options={
            ({ route }) => ({
              title: "Resultados: " + route.params.search,
              headerTintColor:'#ffffff',
              headerStyle:{
                backgroundColor:'#1c2134',
              },

          })}/>
          <Stack.Screen name = "gameInfoScreen" component={gameInfoScreen} options={{
            headerShown: false
          }}/>
          <Stack.Screen name = "gamesbygenreScreen" component={gamesbygenreScreen} options={
            ({ route }) => ({
              headerStyle:{
                backgroundColor:'#1c2134'},
                title: route.params.name,
                headerTintColor: "#fff",
                headerTitleAlign:"center"
              })
                
            }
          />
        </Stack.Navigator>
      </NavigationContainer>
      
  )
}
