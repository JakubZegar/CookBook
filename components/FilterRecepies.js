import React,{Component} from 'react';
import {StyleSheet, AsyncStorage} from 'react-native';
import { Button, Icon } from 'react-native-elements'

export default class FilterRecepies extends Component{

    constructor(props){
        super(props)
        this.state={
            isProductsLoaded:false,
            yourProducts:[]
        }
    }

    componentDidMount(){

        this._retrieveData()
    }

    filterRecepies = async() => {
        if(this.state.isProductsLoaded){
            try{
            await this._retrieveData()
            const rawResponse = await fetch('https://cookbook-serv.herokuapp.com/api/recepies/filter', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body:JSON.stringify(this.state.yourProducts)
              });
            await rawResponse.json().then(
                
                fetch('https://cookbook-serv.herokuapp.com/api/recepies/filtered')
                    .then( res => res.json())
                    .then(json => {
                    this.setState({
                        recepies:json,
                    })
                    this.props.showAvalible(json)
                })
            )
            } catch(error){

            }
        }
    }

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


    render(){
        return(
                <Button buttonStyle={styles.button}
                        icon={<Icon name='restaurant-menu' color='#ffffff' />} 
                        title={'Pokaż przepisy możliwe do wykonania'} 
                        onPress={() => this.filterRecepies()} />
        )
    }    
}


const styles = StyleSheet.create({

    button:{
        alignItems:"center",
        width:350,
        height:50,
        borderColor:'rgba(255,255,255,0.5)',
        borderWidth:1,
        marginBottom: 10,
        backgroundColor:'rgba(0,0,0,0.7)',
        borderRadius:15,
        marginTop:20
    },
})