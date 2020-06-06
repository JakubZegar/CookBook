import React,{Component} from 'react';
import {View,StyleSheet , ImageBackground, StatusBar, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { Button, Icon } from 'react-native-elements'
import RecepieCard from '../components/RecepieCard'
import RecepieDetails from '../components/RecepieDetails'
import AddRecpie from '../components/AddRecepie'
export default class Recepies extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          data: props.data,
          showExact:false,
          recepieId:null,
          api:"https://cookbook-serv.herokuapp.com/api/",
          recepies:null,
          isLoaded:false,
          isAddingRecepies:false,
        }
        this._isMounted = false;
        this.goToDetails = this.goToDetails.bind(this)
        this.goBackToRecepieList = this.goBackToRecepieList.bind(this)
        this.finishAddingRecepies = this.finishAddingRecepies.bind(this)
    }

    componentDidMount(){
        this._isMounted = true;
        if(this._isMounted && this.state.recepies == null){
            fetch(this.state.api + 'recepies')
            .then( res => res.json())
            .then(json => {
              this.setState({
                recepies:json,
                isLoaded:true,
              })
            })
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
     }
    
  goToDetails(id) {
    this.setState({
        recepieId:id,
        showExact:true,
    })
  }

  goBackToRecepieList(){
    this.setState({
        showExact:false,
        recepieId:null,
    })
  }

  finishAddingRecepies(){
      this.setState({
          isAddingRecepies:false,
      })
  }
  
    render() {
        return(
            <ImageBackground source={require('../assets/bg1.jpg')} style={styles.bgstyle}>
                <StatusBar backgroundColor="black" barStyle={'light-content'} />
                <SafeAreaView style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        {
                            !this.state.isAddingRecepies &&
                            <View style={styles.recepiesContainer}>
                                <Button icon={<Icon name='restaurant-menu' color='#ffffff' />} 
                                buttonStyle={styles.addRecepieButton}
                                title='Dodaj nowy przepis'
                                onPress={()=>this.setState({isAddingRecepies:true})} />
                            </View>                                
                        }

                        {
                            !this.state.showExact && this.state.isLoaded && !this.state.isAddingRecepies &&
                            <View style={styles.recepiesContainer}>
                                {
                                    this.state.recepies.map( recepie => (
                                            <RecepieCard name={recepie.name}
                                            key={recepie.recepieId} 
                                            image={{uri: recepie.image}} 
                                            id={recepie.recepieId} 
                                            goToDetails = {()=>this.goToDetails(recepie.recepieId)} />   
                                        )
                                    )
                                }
    
                            </View>
                        }

                        {
                            this.state.showExact && !this.state.isAddingRecepies &&
                            <View style={styles.recepiesContainer}>
                                <RecepieDetails name={"Przepis"} 
                                    recepieId={this.state.recepieId}
                                    goBackToRecepieList = { () => this.goBackToRecepieList()  }></RecepieDetails>
                            </View>
                        } 

                        {
                            this.state.isAddingRecepies && !this.state.showExact &&
                            <View style={styles.recepiesContainer}>
                                <AddRecpie finishAddingRecepies={() => this.finishAddingRecepies()}></AddRecpie>
                            </View>
                        }
                    </ScrollView>
                </SafeAreaView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    bgstyle:{    
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    container: {
        display:"flex",
        flex: 1,
        alignItems: 'stretch',
        marginBottom:"6.7%"

    },
    textStyle:{
        color:"#ffffff"
    },
    scrollView: {
        display:"flex",
        flex:1,
        marginBottom: 32,
      },
    text: {
        display:"flex",
        color:"white",
        flex:1,
        fontWeight:"bold",
        fontSize: 18,
      },
      recepiesContainer:{ 
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flex:1,
        },
    addRecepieButton:{
        alignItems:"center",
        
        width:350,
        height:50,
        borderColor:'rgba(255,255,255,0.5)',
        borderWidth:1,
        marginVertical:0,
        marginBottom: 10,
        backgroundColor:'rgba(0,0,0,0.7)',
        borderRadius:15,
        marginTop:20
    }
  });