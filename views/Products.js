import React,{Component} from 'react';
import {View,Text,StyleSheet, ImageBackground, StatusBar} from 'react-native';
import ProductAcordElem from '../components/ProductAcordElem'
import { ScrollView } from 'react-native-gesture-handler';


function renderPlaceholderProducts(){
    const products = []

    for( let i = 0; i < 20; ++i){
        products.push(
            <ProductAcordElem key={i} title={'Produkt'} data={'Szczegóły produktu'}/>
        )
    }

    return products;
}

export default class Products extends Component {
    render() {
        return(
            <ImageBackground source={require('../assets/bg1.jpg')} style={{width: '100%', height: '105%', }}>
                <StatusBar backgroundColor="black" barStyle={'light-content'} />
                <ScrollView style={styles.scroll}>
                    <View style={styles.productContainer}>

                        {renderPlaceholderProducts()}

                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    productContainer: {
        display:"flex",
        flex: 1,
        flexDirection:'column',
        alignItems: 'stretch',
        justifyContent: "center",
        margin:20,
        backgroundColor:"transparent",
    },
    scroll:{
        marginBottom:32,
    },
    textStyle:{
        color:"#ffffff"
    },
  });