import React,{Component} from 'react';
import {View,Text,StyleSheet, ImageBackground, StatusBar} from 'react-native';

export default class Products extends Component {
    render() {
        return(
            <ImageBackground source={require('../assets/bg1.jpg')} style={{width: '100%', height: '105%'}}>
                <StatusBar backgroundColor="black" barStyle={'light-content'} />
                <View style={styles.container}>
                        <Text style={styles.textStyle}>Products Screen</Text>
                </View>
            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        display:"flex",
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
    },
    textStyle:{
        color:"#ffffff"
    },
  });