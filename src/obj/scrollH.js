import { HeaderBackground } from "@react-navigation/stack";
import React, { Component } from "react";
import {View,Text, StyleSheet,Image,Dimensions, ImageBackground} from "react-native";

const {width, height} = Dimensions.get("window");


class Categoria extends Component {
    render() {
        return (
            <View>
                <Image source={this.props.ss}
                    style={styles.gameCover}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
    gameCover:{
        width: width*0.99,
        height:height*0.35
    }
});

export default Categoria;