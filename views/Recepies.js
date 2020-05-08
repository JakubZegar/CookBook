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
        }
        this.goToDetails = this.goToDetails.bind(this)
        this.goBackToRecepieList = this.goBackToRecepieList.bind(this)
    }

    
  goToDetails(id) {
    this.setState({
        showExact:true,
        recepieId:id,
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
                            !this.state.showExact &&
                            <View style={styles.recepiesContainer}>
                                <RecepieCard name={"Przepis"} 
                                            image={{uri: 'http://t0.gstatic.com/images?q=tbn:ANd9GcTXV_EQmNUSW6GobcuU_BQUVkBE1_FDAhdOzmELWH6nwOYCBo52sOevLZVBD1MHgTRoIBMxJ6bqsIWz4qSRE6A'}} 
                                            description={'To jest przykładowy przepis'} id={0} goToDetails = {()=>this.goToDetails(0)} />   
                                <RecepieCard name={"Przepis"} 
                                            image={{uri: 'http://t0.gstatic.com/images?q=tbn:ANd9GcTXV_EQmNUSW6GobcuU_BQUVkBE1_FDAhdOzmELWH6nwOYCBo52sOevLZVBD1MHgTRoIBMxJ6bqsIWz4qSRE6A'}} 
                                            description={'To jest przykładowy przepis'} id={0} goToDetails = {()=>this.goToDetails(0)}/>        
                                <RecepieCard name={"Przepis"} 
                                            image={{uri: 'http://t0.gstatic.com/images?q=tbn:ANd9GcTXV_EQmNUSW6GobcuU_BQUVkBE1_FDAhdOzmELWH6nwOYCBo52sOevLZVBD1MHgTRoIBMxJ6bqsIWz4qSRE6A'}} 
                                            description={'To jest przykładowy przepis'} id={0} goToDetails = {()=>this.goToDetails(0)}/>              
                                <RecepieCard name={"Przepis"} 
                                            image={{uri: 'http://t0.gstatic.com/images?q=tbn:ANd9GcTXV_EQmNUSW6GobcuU_BQUVkBE1_FDAhdOzmELWH6nwOYCBo52sOevLZVBD1MHgTRoIBMxJ6bqsIWz4qSRE6A'}} 
                                            description={'To jest przykładowy przepis'} id={0} goToDetails = {()=>this.goToDetails(0)}/>
                            </View>
                        }

                        {
                            this.state.showExact &&
                            <View style={styles.recepiesContainer}>
                                <RecepieDetails name={"Przepis"} 
                                    image={{uri: 'http://t0.gstatic.com/images?q=tbn:ANd9GcTXV_EQmNUSW6GobcuU_BQUVkBE1_FDAhdOzmELWH6nwOYCBo52sOevLZVBD1MHgTRoIBMxJ6bqsIWz4qSRE6A'}} 
                                    description={'To jest przykładowy przepis'} id={0}
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

        flex:1,
    },
  });