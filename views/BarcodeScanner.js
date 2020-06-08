import React, {Component} from 'react';
import { StyleSheet,Text,View,Dimensions, ImageBackground, StatusBar, AsyncStorage } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Input,Card, Button } from 'react-native-elements'
import AddProduct from '../components/AddProduct';

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
        isInDatabase:false,
        scannedProduct:null,

        barcode:"",

        showAddingForm:false,
    }

    this.backToScan = this.backToScan.bind(this)
 }

  async componentDidMount() {

    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ CameraPermissionGranted: status === "granted" ? true : false });

    if(!this.state.isProductLoaded){
      this._retrieveData();
    }
  }

  backToScan() {
    this.setState({
      scanned:false
    })
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
            yourProducts:JSON.parse(value),
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
      isInDatabase:false,
      isFound:false,
      showAddingForm:false,
      barcode:data,
    })
    try{
      fetch("https://cookbook-serv.herokuapp.com/api/products/barcode/" + data)
        .then( res => res.json())
        .then(json => {
          if( json.status == 500){                                                    ///do zmiany
            this.setState({
              showAddingForm:true,
            })
          } else {
            this.setState({
              isInDatabase:true,
              scannedProduct:json,
            })
            this.state.yourProducts.map((product, index) =>{
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
      return(
        <ImageBackground source={require('../assets/bg1.jpg')} style={styles.bgstyle}>
          <View style={styles.container}>
              <Text style={styles.text}>Pozwól na dostęp do kamery</Text>
          </View> 
        </ImageBackground>
      );
    }
    if(CameraPermissionGranted === false){
      return ( 
        <ImageBackground source={require('../assets/bg1.jpg')} style={styles.bgstyle}>
          <View style={styles.container}>
            <Text style={styles.text}>Brak dostępu do kamery</Text>
          </View> 
        </ImageBackground>
      );
    }
    if(CameraPermissionGranted === true){
      return(
        <ImageBackground source={require('../assets/bg1.jpg')} style={styles.bgstyle}>
            <StatusBar backgroundColor="black" barStyle={'light-content'} />
            <View style={styles.scanner}>
              {
                !this.state.scanned && 
                  <BarCodeScanner onBarCodeScanned={ this.barCodeScanned }  style={StyleSheet.absoluteFillObject}/>
              }

              {
                this.state.scanned && this.state.isInDatabase &&
                <View>
                  <View style={styles.productsStyle}>
                    <Text style={styles.cardLabel}>
                      Zeskanowano produkt:
                    </Text>
                    <View style={styles.singleProductRow}>
                      <Text style={styles.cardTitle}>
                        Nazwa:
                      </Text>
                      <Text style={styles.cardTitle}>
                        {this.state.scannedProduct.name}
                      </Text>
                    </View>
                    <View style={styles.singleProductRow}>
                      <Text style={styles.cardTitle}>
                        Kod kreskowy:
                      </Text>
                      <Text style={styles.cardTitle}>
                        {this.state.scannedProduct.barcode}
                      </Text>
                    </View>
                    <View style={styles.singleProductRow}>
                      <Text style={styles.cardTitle}>
                        Ilość:
                      </Text>
                      <Text style={styles.cardTitle}>
                        {this.state.scannedProduct.amount +" "+ this.state.scannedProduct.unit}
                      </Text>
                    </View>
                  </View>

                  <Button buttonStyle={styles.button} title={'Skanuj ponownie'} onPress={() => this.backToScan()} />
                </View>
              }
              {
                this.state.scanned && this.state.showAddingForm &&
                <View>
                  <AddProduct 
                    barcode={this.state.barcode} 
                    title={"Nie udało się znaleźć produktu, ale możesz go dodać"} 
                    goBack={() => this.backToScan()} 
                    returnMessage={"Skanuj ponownie"}>
                  </AddProduct>
                </View>
              } 
            </View>
          </ImageBackground>
      );
    } 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgstyle:{    
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  text:{
    color:"white",
    fontWeight:"bold",
    fontSize:18,
    backgroundColor:'rgba(0,0,0,0.7)',
    padding:20,
    borderRadius: 15,
    borderColor:'rgba(255,255,255,0.5)',
    borderWidth:1,
  },
  scanner:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:"center",
    height:'50%',
    margin:'8%',
    marginBottom:'32%',
  },

  button:{
    backgroundColor:'rgba(0,0,0,0.7)',
    borderRadius: 10,
    borderColor:'rgba(255,255,255,0.5)',
    borderWidth:1,
    width:"100%",
    marginVertical:15,
  },
  info:{
    backgroundColor:'rgba(0,0,0,0.7)',
    borderRadius: 10,
    borderColor:'rgba(255,255,255,0.5)',
    borderWidth:1,
    alignSelf:"stretch",
    height:"50%",
    marginTop:40,
    margin:30,
  },
  cardTitle:{
    alignSelf:"center",
    marginVertical:10,
    color:"white",
    marginHorizontal:20
},
cardLabel:{
  fontWeight:"bold",
  alignSelf:"center",
  marginVertical:10,
  color:"white",
  marginHorizontal:20
},
productsStyle:{
    backgroundColor:'rgba(0,0,0,0.7)',
    borderRadius: 10,
    borderColor:'rgba(255,255,255,0.5)',
    borderWidth:1,
    display:"flex",
    flexDirection:"column",
    paddingVertical:10
},
singleProductRow:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between"
}
});