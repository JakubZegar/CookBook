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
            selectedItems:[]
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
        let a = ""
        //alert(JSON.stringify(this.state.newRecepie))
        this.state.checked.forEach(element => {
            a+= " "
            a+= element
            
        });
        alert(a)
        //alert(JSON.stringify(this.state.selectedItems))
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
                
                this.state.expanded &&
                this.state.allPrducts.map( (product, index) =>(

                    <ListItem
                        key={index}
                        title={product.name}
                        subtitle={product.amount +" "+ product.unit}
                        checkBox={{ checked:this.isItemChecked(index),
                        onPress:evt => this.manageToggle(evt, index)    }}
                        bottomDivider
                    />
                    
                ))
            }
            {
                
            }

                        
            <Button onPress={ () => this.getData()}
                icon={<Icon name='restaurant' color='#ffffff' />} 
                buttonStyle={{ borderRadius: 5, borderColor:'rgba(255,255,255,0.5)',borderWidth:1,marginVertical:0, marginBottom: 10, backgroundColor:'rgba(0,0,0,0.65)'}}
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