import React,{Component} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, Text, View,Switch} from 'react-native';
import { Card, Button, Icon } from 'react-native-elements'
import { Input,ListItem, CheckBox  } from 'react-native-elements'

export default class AddRecpie extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            newRecepie:{
                name:"",
                image:"",
                description:""
            },
            allPrducts:[],
            areProductsLoaded:false,
            expanded:false,
            checked:[],
            amountOfSelected:[],
        }
     }

     componentDidMount(){
        if(!this.state.areProductsLoaded){
            fetch("https://cookbook-serv.herokuapp.com/api/products")
            .then( res => res.json())
            .then(json => {
              this.setState({
                allPrducts:json,
                areProductsLoaded:true,
              })
            })
        }
     }

     _postData = async () => {
        const rawResponse = await fetch('https://cookbook-serv.herokuapp.com/api/recepies/create', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(this.state.newRecepie)
        });
        const content = await rawResponse.json().then(

            this.state.checked.forEach(product => {
                let payload ={
                    recepieId:eval(this.props.lastIndex + 1),
                    productId:eval(product + 1),
                    amount:this.state.amountOfSelected[product]
                }
                this._postProducts(payload)
            })
        ).then(this.props.finishAddingRecepies())
    }

    _postProducts = async (payload) => {
        const rawResponse = await fetch('https://cookbook-serv.herokuapp.com/api/recepieProducts/create', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(payload)
          });
          const content = await rawResponse.json()
    }
    

    toggleExpand = () => {
        this.setState({expanded : !this.state.expanded})
    }

    setName(value){
        this.state.newRecepie.name = value
    }

    setImage(value){
        this.state.newRecepie.image = value
    }

    setDescription(value){
        this.state.newRecepie.description = value
    }

    getData(){
        this._postData()
    }
    
    isItemChecked(index) {
        return this.state.checked.indexOf(index) > -1            
    }

    manageToggle = (evt, index) => {
        if (this.isItemChecked(index)) {
          this.setState({
            checked: this.state.checked.filter(i => i !== index)
          })
        } else {
          this.setState({
            checked: [...this.state.checked, index]
          })
        }
    }

    setAmount = (index, value) => {
        if(value > 0){
            this.state.amountOfSelected[index] = eval(value/this.state.allPrducts[index].amount);
        }
    }

    render() {
        return(
            <Card title={"Dodaj nowy przepis"}
            containerStyle={styles.containerStyle}
            titleStyle={{color:"white", alignSelf:"stretch"}}>

                <Input 
                    inputStyle={styles.regularInput}
                    placeholder='Nazwa przepisu'
                    rightIcon={{ type: 'font-awesome', name: 'pencil', color:'white' }}
                    onChangeText={value => this.setName(value)}/>

                <Input
                    inputStyle={styles.regularInput}
                    placeholder='Adres do zdjęcia'
                    rightIcon={{ type: 'font-awesome', name: 'camera', color:'white' }}
                    onChangeText={value => this.setImage(value)} />

                <Input
                    inputStyle={styles.regularInput}
                    inputContainerStyle={styles.bigInput}
                    placeholder='Szczegóły przepisu'
                    rightIcon={{ type: 'font-awesome', name: 'sticky-note', color:'white' }}
                    multiline={true}
                    onChangeText={value => this.setDescription(value)}/>

            <TouchableOpacity style={styles.row} onPress={()=>this.toggleExpand()} activeOpacity={1} >
                <Text style={[styles.title, styles.font]}>Dodaj produkty do przepisu</Text>
                <View style={styles.leftSide}>
                    <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={'white'} />
                </View>
            </TouchableOpacity>
            {
                
                this.state.expanded && this.state.amountOfSelected.push(0) &&
                this.state.allPrducts.map( (product, index) =>(
                    <ListItem
                        key={index}
                        title={product.name}
                        containerStyle={{backgroundColor:'transparent',  alignSelf:'center' }}
                        titleStyle={{ color: 'white' }}
                        subtitleStyle={{ color: 'white' }}
                        subtitle={product.unit}
                        checkBox={{ checked:this.isItemChecked(index),
                            onPress:evt => this.manageToggle(evt, index) , checkedColor:'white'   }}
                        input={{containerStyle:{borderBottomColor:'rgba(255,255,255,0.5)',borderBottomWidth:1,alignSelf:"flex-end"}, 
                                inputStyle:{color:'white'},
                                placeholder:"Wpisz ilość",
                                keyboardType:"numeric",
                                onChangeText:value => this.setAmount(index, value)
                            }}
                        bottomDivider
                    />
                ))
            }
                        
            <Button onPress={ () => this.getData()}
                icon={<Icon name='restaurant' color='#ffffff' />} 
                buttonStyle={{ borderRadius: 5, borderColor:'rgba(255,255,255,0.5)',borderWidth:1,marginVertical:0, marginVertical: 20, backgroundColor:'rgba(0,0,0,0.65)'}}
                title='Wyślij' >
            </Button>

            </Card>                    
        );
    }
}

const styles = StyleSheet.create({

    cardTitle:{
        alignSelf:"center",
        marginBottom:10,
        color:"white",
    },
    containerStyle:{
        alignItems:"stretch", 
        justifyContent:"center", 
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