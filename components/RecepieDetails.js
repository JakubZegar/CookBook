import React,{Component} from 'react';
import {Text,StyleSheet} from 'react-native';
import { Card, Button, Icon } from 'react-native-elements'


export default class RecepieCard extends Component {

    constructor(props) {
        super(props);
        this.state = { 

          api:"https://cookbook-serv.herokuapp.com/api/recepies/",
          recepieDetails:null,
          isLoaded:false,
        }
    }

    componentDidMount(){
        if(this.state.recepies == null){
            fetch(this.state.api + this.props.recepieId)
            .then( res => res.json())
            .then(json => {
              this.setState({
                recepieDetails:json,
                isLoaded:true,
              })
            })
        }
    }

    render() {
        return(
            
            this.state.isLoaded &&
            <Card title={this.state.recepieDetails.name} image={{uri: this.state.recepieDetails.image}} 
                containerStyle={{alignItems:"center", justifyContent:"center", width:350, backgroundColor:'rgba(0,0,0,0.7)', 
                                borderColor:"transparent", borderRadius:15}}
                titleStyle={{color:"white",}} >

                <Button icon={<Icon name='restaurant' color='#ffffff' />} 
                    buttonStyle={{ borderRadius: 5, borderColor:'rgba(255,255,255,0.5)',borderWidth:1,marginVertical:0,
                                marginBottom: 10, backgroundColor:'rgba(0,0,0,0.65)'}}
                    title='Powrót'
                    onPress={ () => this.props.goBackToRecepieList() } />

                <Text style={styles.cardTitle}>
                    Szczegóły przepisu
                </Text>

                <Text style={styles.cardTitle}>
                    {this.state.recepieDetails.description}
                </Text>
            </Card>
            
        );
    }
}

const styles = StyleSheet.create({

    cardTitle:{
        alignSelf:"center",
        marginBottom:10,
        color:"white",
        marginHorizontal:20
    },
})