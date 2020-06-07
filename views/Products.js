import React,{Component} from 'react';
import {View,Text,StyleSheet, ImageBackground, StatusBar, AsyncStorage, Dimensions} from 'react-native';
import ProductAcordElem from '../components/ProductAcordElem'
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Button, Icon } from 'react-native-elements'
import AddProduct from '../components/AddProduct';

export default class Products extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            yourProducts:[],
            isProductsLoaded:false,

            addNewProductForm:false,
        }

        this.addProduct = this.addProduct.bind(this)
        this.substractProduct = this.substractProduct.bind(this)
        this.switchScreenToAddingForm = this.switchScreenToAddingForm.bind(this)
    }

    componentDidMount(){
        if( !this.state.isProductsLoaded){
            this._retrieveData();
        }
    }

    switchScreenToAddingForm(){
      this.setState({
        addNewProductForm:!this.state.addNewProductForm
      })
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
            <ImageBackground source={require('../assets/bg1.jpg')} style={styles.bgstyle}>
                <StatusBar backgroundColor="black" barStyle={'light-content'} />
                {  !this.state.addNewProductForm &&          
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
                      <Button icon={<Icon name='restaurant' color='#ffffff' />} 
                      buttonStyle={styles.refresh}
                      title='Odśwież'
                      onPress={ () => this.refresh()} />

                      <Button icon={<Icon name='restaurant' color='#ffffff' />} 
                        buttonStyle={styles.refresh}
                        title='Dodaj nowy produkt'
                        onPress={ () => this.switchScreenToAddingForm()} />
                  </ScrollView>
                }

                {
                  this.state.addNewProductForm &&
                  <AddProduct barcode={""} title={"Dodaj nowy produkt do bazy"} goBack={() => this.switchScreenToAddingForm()}></AddProduct>
                }
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
    bgstyle:{    
      position: 'absolute',
      left: 0,
      top: 0,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
  },
    scroll:{
        marginBottom:32,
    },
    textStyle:{
        color:"#ffffff"
    },
    refresh:{
      borderRadius: 5, 
      borderColor:'rgba(255,255,255,0.5)',
      borderWidth:1,
      marginHorizontal:20, 
      marginBottom: 10, 
      backgroundColor:'rgba(0,0,0,0.7)'
    },
  });