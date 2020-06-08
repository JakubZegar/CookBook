import React,{Component} from 'react';
import {View,StyleSheet , ImageBackground, StatusBar, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { Button, Icon } from 'react-native-elements'
import RecepieCard from '../components/RecepieCard'
import RecepieDetails from '../components/RecepieDetails'
import AddRecpie from '../components/AddRecepie'
import FilterRecepies from '../components/FilterRecepies';
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

          showingAvalibleRecepies:false,
        }
        this._isMounted = false;
        this.goToDetails = this.goToDetails.bind(this)
        this.goBackToRecepieList = this.goBackToRecepieList.bind(this)
        this.finishAddingRecepies = this.finishAddingRecepies.bind(this)
        this.showAvalible = this.showAvalible.bind(this)
    }

    componentDidMount(){
        this._isMounted = true;
        this._loadData();

    }
    componentWillUnmount() {
        this._isMounted = false;
     }

    showAvalible( avalibleRecepies ) {

        this.setState({
            recepies:avalibleRecepies,
            showingAvalibleRecepies:true,
        })
    }
    
    goToDetails(id) {
        this.setState({
            recepieId:id,
            showExact:true,
        })
    }

    _loadData = async () => {

            fetch(this.state.api + 'recepies')
            .then( res => res.json())
            .then(json => {
            this.setState({
                recepies:json,
                isLoaded:true,
                showingAvalibleRecepies:false,
            })
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
          recepies:null,
          isLoaded:false,
      })
      this._loadData()
  }

  showAll(){

      this._loadData()
  }
  
    render() {
        return(
            <ImageBackground source={require('../assets/bg1.jpg')} style={styles.bgstyle}>
                <StatusBar backgroundColor="black" barStyle={'light-content'} />
                <SafeAreaView style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        {
                            !this.state.isAddingRecepies && this.state.isLoaded &&
                            <View style={styles.recepiesContainer}>
                                <Button icon={<Icon name='restaurant-menu' color='#ffffff' />} 
                                buttonStyle={styles.addRecepieButton}
                                title='Dodaj nowy przepis'
                                onPress={()=>this.setState({isAddingRecepies:true})} />

                                {
                                    !this.state.showingAvalibleRecepies && !this.state.showExact &&
                                    <FilterRecepies allRecepies={this.state.recepies} showAvalible={(avalibleRecepies)=>this.showAvalible(avalibleRecepies)}/>
                                }
                                {
                                    this.state.showingAvalibleRecepies && 
                                    <Button icon={<Icon name='restaurant-menu' color='#ffffff' />} 
                                    buttonStyle={styles.addRecepieButton}
                                    title='Pokaż wszystkie przepisy'
                                    onPress={()=> this.showAll() } />
                                }
                                
                            </View>                                
                        }

                        {
                            !this.state.showExact && this.state.isLoaded && !this.state.isAddingRecepies &&
                            <View style={styles.recepiesContainer}>
                                {
                                    this.state.recepies.map( (recepie,index) => (
                                            <RecepieCard name={recepie.name}
                                            key={index+1} 
                                            image={recepie.image} 
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
                                <RecepieDetails
                                    recepieId={this.state.recepieId}
                                    goBackToRecepieList = { () => this.goBackToRecepieList()  }></RecepieDetails>
                            </View>
                        } 

                        {
                            this.state.isAddingRecepies && !this.state.showExact &&
                            <View style={styles.recepiesContainer}>
                                <AddRecpie finishAddingRecepies={() => this.finishAddingRecepies()} 
                                    lastIndex={this.state.recepies.length}></AddRecpie>
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
        marginBottom: 10,
        backgroundColor:'rgba(0,0,0,0.7)',
        borderRadius:15,
        marginTop:20
    }
  });