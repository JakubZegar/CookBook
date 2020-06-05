import React, {Component} from 'react';
import { StyleSheet,Text,View,Dimensions, ImageBackground, StatusBar, Button, AsyncStorage } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default class BarcodeScanner extends Component{

  constructor(props) {
    super(props);
    this.state = { 
        yourProducts:[],
        CameraPermissionGranted: null,  
        scanned:false,
        isProductLoaded:false,
        isChecking:false,
        isFound:false,
    }
 }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ CameraPermissionGranted: status === "granted" ? true : false });

    if(!this.state.isProductLoaded){
      this._retrieveData();
    }
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


  barCodeScanned = async ({ data }) => {
    this._retrieveData()
    this.setState({
      scanned:true,
      isChecking:true,
    })
    try{
      fetch("https://cookbook-serv.herokuapp.com/api/products/barcode/" + data)
        .then( res => res.json())
        .then(json => {
          if( json.status == 500){                                                    ///do zmiany
            alert("Produkt nie istnieje w bazie")
          } else {
            
            this.state.yourProducts.map((product, index) =>{
                alert(JSON.stringify(this.state.yourProducts))
                if(product.name == json.name){
                  this.state.yourProducts[index].amount += json.amount
                  this.setState({
                    isFound:true,
                  })
                  this._storeData();
                }
              })
            if( !this.state.isFound ){
              this.state.yourProducts.push(json)
              this._storeData();
            }
          }
        })      
    } catch(error) {
      alert(error)
    }

  }

  render(){
    const { CameraPermissionGranted } = this.state;
    if(CameraPermissionGranted === null){
      // Request Permission
      return(
        <View style={styles.container}>
            <Text>Please grant Camera permission</Text>
        </View> 
      );
    }
    if(CameraPermissionGranted === false){
        // Permission denied
      return ( 
        <View style={styles.container}>
         <Text>Camera Permission Denied.</Text>
        </View> 
      );
    }
    if(CameraPermissionGranted === true){
      return(
        <ImageBackground source={require('../assets/bg1.jpg')} style={{width: '100%', height: '105%'}}>
            <StatusBar backgroundColor="black" barStyle={'light-content'} />
            <View
            style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
                height:'70%',
                margin:'8%',
            }}>
              {
                !this.state.scanned && <BarCodeScanner onBarCodeScanned={ this.barCodeScanned }  style={StyleSheet.absoluteFillObject}/>
              }

                {this.state.scanned && <Button title={'Skanuj ponownie'} onPress={() => this.setState({scanned:false})} />}
            </View>
        </ImageBackground>
      );
    } 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

  // return (
  //   <ImageBackground source={require('../assets/bg1.jpg')} style={{width: '100%', height: '105%'}}>
  //       <StatusBar backgroundColor="black" barStyle={'light-content'} />
  //       <View
  //       style={{
  //           flex: 1,
  //           flexDirection: 'column',
  //           justifyContent: 'flex-end',
  //           height:'70%',
  //           margin:'8%',
  //       }}>
  //           <BarCodeScanner
  //               onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
  //               style={StyleSheet.absoluteFillObject}
  //           />

  //           {scanned && <Button title={'Skanuj ponownie'} onPress={() => setScanned(false)} />}
  //       </View>
  //   </ImageBackground>
  // );

