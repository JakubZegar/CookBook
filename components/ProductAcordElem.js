import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class ProductAcordElem extends Component{

    constructor(props) {
        super(props);
        this.state = { 
          data: props.data,
          expanded : false,
        }
    }
  
  render() {


    return (
       <View style={styles.container}>
            <TouchableOpacity style={styles.row} onPress={()=>this.toggleExpand()} activeOpacity={1} >
                <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
                <Text style={[styles.title, styles.font]}>Ilość: 0</Text>
                <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={'white'} />
            </TouchableOpacity>
            <View style={styles.parentHr}/>
            {
                this.state.expanded &&
                <View style={styles.child}>
                    <Text style={styles.details}>{this.props.data}</Text>
                    <Text style={styles.details}>Więcej szczegółów</Text>
                </View>
            }
       </View>
    )
  }

  toggleExpand=()=>{
    this.setState({expanded : !this.state.expanded})
  }

}

const styles = StyleSheet.create({

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
    parentHr:{
        
        color: "white",
        width:'100%'
    },
    child:{
        backgroundColor: "rgba(0,0,0,0.6)",
        padding:16,
        borderRightWidth:0,
        borderLeftWidth:0,
        borderWidth:2,
    },
    details:{
        color:'white'
    },
    
});