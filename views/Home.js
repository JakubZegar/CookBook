import React,{Component} from 'react';
import { Text, StyleSheet, StatusBar, View , ImageBackground} from 'react-native';
export default class Home extends Component {

    render() {
        return(
            <ImageBackground source={require('../assets/bg1.jpg')} style={{width: '100%', height: '105%'}}>
                <StatusBar backgroundColor="black" barStyle={'light-content'} />
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