import React,{Component} from 'react';
import {View,Text,StyleSheet, ImageBackground, StatusBar, AsyncStorage} from 'react-native';
import ProductAcordElem from '../components/ProductAcordElem'
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';

export default class Products extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            yourProducts:[],
            isProductsLoaded:false,
        }

        this.addProduct = this.addProduct.bind(this)
        this.substractProduct = this.substractProduct.bind(this)
    }

    componentDidMount(){
        if( !this.state.isProductsLoaded){
            this._retrieveData();
        }
    }

    refresh(){
      this._retrieveData();
    }

    _storeData = async () => {
        try {
          await AsyncStorage.setItem(
            '@products', JSON.stringify(this.state.yourProducts)
          );
        } catch (error) {
          alert("Nie udało się zapisać produktów")
        }
      };

     _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('@products');
          if (value !== null) {

            this.setState({
                isProductsLoaded:true,
                yourProducts:JSON.parse(value)
            })
          }
        } catch (error) {
          alert("Nie udało się pobrać produktów")
        }
      };

      addProduct(index){
        const newProducts = this.state.yourProducts.slice()
        newProducts[index].amount += 1

          this.setState({
              yourProducts:newProducts
          })
        this._storeData()
      }

      substractProduct(index){
        const newProducts = this.state.yourProducts.slice()
        newProducts[index].amount -= 1
        
          this.setState({
              yourProducts:newProducts
          })
          this._storeData()
      }

    render() {
        return(
            <ImageBackground source={require('../assets/bg1.jpg')} style={{width: '100%', height: '105%', }}>
                <StatusBar backgroundColor="black" barStyle={'light-content'} />
                <ScrollView style={styles.scroll}>
                    <View style={styles.productContainer}>
                        {
                            this.state.isProductsLoaded && this.state.yourProducts.map( (product, index) => (
                                <ProductAcordElem key={index} index={index} title={product.name} amount={product.amount}
                                                 unit={product.unit} addProduct={this.addProduct} 
                                                 substractProduct={this.substractProduct} />
                            ))
                        }
                    </View>
                    <Button onPress={ () => this.refresh()}>Odśwież </Button>
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