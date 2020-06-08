import React,{Component} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, Text, View,Switch} from 'react-native';
import { Card, Button, Icon } from 'react-native-elements'
import { Input,ListItem, CheckBox  } from 'react-native-elements'

export default class AddProduct extends Component{

    constructor(props){
        super(props)
        this.state={
            newProduct:{
                name:"",
                barcode:"",
                amount:"",
                unit:""
            },
        }
    }

    componentDidMount(){
        this.state.newProduct.barcode = this.props.barcode
    }

    _postData = async () => {
        try{
            const rawResponse = await fetch('https://cookbook-serv.herokuapp.com/api/products/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(this.state.newProduct)
            });
            await rawResponse.json().then(
                this.props.goBack()
            )
        } catch (error) {
            
        }
    }

    setName(value){
        this.state.newProduct.name = value
    }

    setBarcode(value){
        this.state.newProduct.barcode = value
    }

    setAmount(value){
        this.state.newProduct.amount = value
    }

    setUnit(value){
        this.state.newProduct.unit = value
    }

    render(){
        return(
        <Card title={this.props.title}
            containerStyle={styles.containerStyle}
            titleStyle={{color:"white", alignSelf:"stretch", marginTop:10}}>

            <Input 
                inputStyle={styles.regularInput}
                placeholder='Nazwa produktu'
                rightIcon={{ type: 'font-awesome', name: 'pencil', color:'white' }}
                onChangeText={value => this.setName(value)}/>

            <Input
                inputStyle={styles.regularInput}
                placeholder='Kod kreskowy'
                keyboardType='numeric'
                defaultValue={this.props.barcode}
                rightIcon={{ type: 'font-awesome', name: 'barcode', color:'white' }}
                onChangeText={value => this.setBarcode(value)} />

            <Input
                inputStyle={styles.regularInput}
                inputContainerStyle={styles.bigInput}
                placeholder='Domyślna ilość'
                keyboardType='numeric'
                rightIcon={{ type: 'font-awesome', name: 'th', color:'white' }}
                onChangeText={value => this.setAmount(value)}/>

            <Input
                inputStyle={styles.regularInput}
                inputContainerStyle={styles.bigInput}
                placeholder='Jednostka'
                rightIcon={{ type: 'font-awesome', name: 'chain-broken', color:'white' }}
                onChangeText={value => this.setUnit(value)}/>

                <Button buttonStyle={styles.button} title={'Dodaj produkt'} onPress={() => this._postData()} />

                <Button buttonStyle={styles.button} title={this.props.returnMessage} onPress={() => this.props.goBack()} />
            </Card>
        )
    }    
}


const styles = StyleSheet.create({

    cardTitle:{
        alignSelf:"center",
        marginBottom:10,
        color:"white",
    },
    button:{
        backgroundColor:'rgba(0,0,0,0.7)',
        borderRadius: 10,
        borderColor:'rgba(255,255,255,0.5)',
        borderWidth:1,
        width:"100%",
        marginVertical:15,
      },
    containerStyle:{
        marginTop:40,
        alignItems:"stretch", 
        justifyContent:"center", 
        alignSelf:"flex-end",
        width:350, 
        backgroundColor:'rgba(0,0,0,0.7)', 
        borderColor:"transparent", 
        borderRadius:15,
    },
    regularInput:{
        color:"white",
    },
    title:{
        fontSize: 14,
        fontWeight:'bold',
        color: "white",
    },
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:56,
        paddingLeft:25,
        paddingRight:18,
        alignItems:'center',
        backgroundColor: "rgba(0,0,0,0.7)",
        marginTop:10,
        borderRadius: 5,
        borderColor:'rgba(255,255,255,0.5)',
        borderWidth:1,
    },
    leftSide:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
    },
    touchableContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        backgroundColor: "rgba(0,0,0,0.6)",
        borderRightWidth:0,
        borderLeftWidth:0,
        borderBottomWidth:1,
    },
})