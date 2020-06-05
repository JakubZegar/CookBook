import React,{Component} from 'react';
import {Text,StyleSheet, View} from 'react-native';
import { Card, Button, Icon } from 'react-native-elements'


export default class RecepieCard extends Component {

    constructor(props) {
        super(props);
        this.state = { 

          api:"https://cookbook-serv.herokuapp.com/api/recepies/",
          apiProducts:"https://cookbook-serv.herokuapp.com/api/recepieProducts/",
          apiProductDetails:"https://cookbook-serv.herokuapp.com/api/products/",
          recepieDetails:null,
          recepieProducts:null,
          recepieProductsDetails:[],
          everythingIsLoaded:false,
          isDetailsLoaded:false,
          isProductLoaded:false,
          isProductDetailsLoaded:false,
        }
    }

    componentDidMount(){
        if(this.state.recepieDetails == null){
            fetch(this.state.api + this.props.recepieId)
            .then( res => res.json())
            .then(json => {
              this.setState({
                recepieDetails:json,
                isDetailsLoaded:true,
              })
              
            })
        }

        if(this.state.recepieProducts == null){
            fetch(this.state.apiProducts + this.props.recepieId)
            .then( res => res.json())
            .then(json => {
              this.setState({
                recepieProducts:json,
                isProductLoaded:true,
              })
              this.state.recepieProducts.map( product => (
                    fetch(this.state.apiProductDetails + product.productId)
                    .then( res => res.json())
                    .then(json =>{
                            this.state.recepieProductsDetails.push(json);
                            if(this.state.recepieProductsDetails.length === this.state.recepieProducts.length){
                                this.sort()
                                this.setState({
                                    isProductDetailsLoaded:true
                                })
                            }
                        })
                    )
                )
            })
        }
    }

    compare(first, second) {
        
        const a = first.productId;
        const b = second.productId;
      
        let comparison = 0;
        if (a > b) {
          comparison = 1;
        } else if (a < b) {
          comparison = -1;
        }
        return comparison;
      }
      

    sort() {
        this.state.recepieProducts.sort(this.compare)
        this.state.recepieProductsDetails.sort(this.compare)
    }

    render() {
        return(
            
            this.state.isDetailsLoaded && this.state.isProductDetailsLoaded && this.state.isProductLoaded &&
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
                    Potrzebne składniki:
                </Text>

                
                
                <View style={styles.productsStyle}>
                    {
                        this.state.isProductDetailsLoaded && this.state.recepieProductsDetails.map( (product, index) => (
                            <View style={styles.singleProductRow}>
                                <Text style={styles.cardTitle}>
                                    {product.name}
                                </Text>
                                <Text style={styles.cardTitle}>
                                    {eval(this.state.recepieProducts[index].amount * product.amount)}
                                    {" " + product.unit}
                                </Text>
                            </View>
                        ))
                    }
                </View>

                <Text style={styles.cardTitle}>
                    Szczegóły przepisu:
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
    productsStyle:{
        display:"flex",
        flexDirection:"column",
    },
    singleProductRow:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between"
    }
})