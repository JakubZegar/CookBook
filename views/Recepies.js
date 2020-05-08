import React,{Component} from 'react';
import {View,Text,StyleSheet , ImageBackground, StatusBar, SafeAreaView, ScrollView} from 'react-native';
import RecepieCard from '../components/RecepieCard'

export default class Recepies extends Component {
    render() {
        return(
            <ImageBackground source={require('../assets/bg1.jpg')} style={{width: '100%', height: '105%'}}>
                <StatusBar backgroundColor="black" barStyle={'light-content'} />
                <SafeAreaView style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.recepiesContainer}>
                            <RecepieCard name={"Przepis"} 
                                        image={{uri: 'http://t0.gstatic.com/images?q=tbn:ANd9GcTXV_EQmNUSW6GobcuU_BQUVkBE1_FDAhdOzmELWH6nwOYCBo52sOevLZVBD1MHgTRoIBMxJ6bqsIWz4qSRE6A'}} 
                                        description={'To jest przykładowy przepis'} />
                                                    
                            <RecepieCard name={"Przepis"} 
                                        image={{uri: 'http://t0.gstatic.com/images?q=tbn:ANd9GcTXV_EQmNUSW6GobcuU_BQUVkBE1_FDAhdOzmELWH6nwOYCBo52sOevLZVBD1MHgTRoIBMxJ6bqsIWz4qSRE6A'}} 
                                        description={'To jest przykładowy przepis'} />
                                                  
                            <RecepieCard name={"Przepis"} 
                                        image={{uri: 'http://t0.gstatic.com/images?q=tbn:ANd9GcTXV_EQmNUSW6GobcuU_BQUVkBE1_FDAhdOzmELWH6nwOYCBo52sOevLZVBD1MHgTRoIBMxJ6bqsIWz4qSRE6A'}} 
                                        description={'To jest przykładowy przepis'} />
                                                    
                            <RecepieCard name={"Przepis"} 
                                        image={{uri: 'http://t0.gstatic.com/images?q=tbn:ANd9GcTXV_EQmNUSW6GobcuU_BQUVkBE1_FDAhdOzmELWH6nwOYCBo52sOevLZVBD1MHgTRoIBMxJ6bqsIWz4qSRE6A'}} 
                                        description={'To jest przykładowy przepis'} />
                        </View>
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
        justifyContent: "center",
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
        alignSelf:"center",
        justifyContent:"center",
        alignItems:"stretch",
        flex:1,
    },
  });