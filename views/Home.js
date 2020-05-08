import React,{Component} from 'react';
import {View,Text,StyleSheet, ImageBackground} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class Home extends Component {
    render() {
        return(
            <ImageBackground source={require('../assets/bg1.jpg')} style={{width: '100%', height: '105%'}}>
                <View style={styles.container}>
                        <Text style={styles.textStyle}>Home Screen</Text>
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