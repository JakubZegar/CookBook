import React,{Component} from 'react';
import {View,Text,StyleSheet , ImageBackground, StatusBar, SafeAreaView, ScrollView} from 'react-native';
import RecepieCard from '../components/RecepieCard'
import RecepieDetails from '../components/RecepieDetails'
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
        }
        this.goToDetails = this.goToDetails.bind(this)
        this.goBackToRecepieList = this.goBackToRecepieList.bind(this)
    }


    componentDidMount(){
        if(this.state.recepies == null){
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
  
    render() {
        return(
            <ImageBackground source={require('../assets/bg1.jpg')} style={{width: '100%', height: '105%'}}>
                <StatusBar backgroundColor="black" barStyle={'light-content'} />
                <SafeAreaView style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        {
                            !this.state.showExact && this.state.isLoaded &&
                            <View style={styles.recepiesContainer}>
                                {

                                    this.state.recepies.map( recepie => (
                                            <RecepieCard name={recepie.name} 
                                            image={{uri: recepie.image}} 
                                            description={'To jest przykładowy przepis'} 
                                            id={recepie.recepieId} 
                                            goToDetails = {()=>this.goToDetails(recepie.recepieId)} />   
                                           
                                        )
                                    )
                                }
    
                            </View>
                        }

                        {
                            this.state.showExact &&
                            <View style={styles.recepiesContainer}>
                                <RecepieDetails name={"Przepis"} 
                                    recepieId={this.state.recepieId}
                                    goBackToRecepieList = { () => this.goBackToRecepieList()  }></RecepieDetails>
                            </View>
                        } 
                    </ScrollView>
                </SafeAreaView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display:"flex",
        flex: 1,
        alignItems: 'stretch',

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
        fontSize: 42,
      },
      recepiesContainer:{ 
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flex:1,
    },
  });