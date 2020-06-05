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
  
    toggleExpand = () => {
        this.setState({expanded : !this.state.expanded})
      }

  render() {

    return (
       <View style={styles.container}>
            <TouchableOpacity style={styles.row} onPress={()=>this.toggleExpand()} activeOpacity={1} >
                <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
                <View style={styles.leftSide}>
                    <Text style={[styles.title, styles.font]}>{this.props.amount} {this.props.unit}</Text>
                    <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={'white'} />
                </View>
            </TouchableOpacity>
            <View style={styles.parentHr}/>
            {
                this.state.expanded &&
                <View style={styles.touchableContainer}>
                    <TouchableOpacity style={styles.child} onPress={ () => this.props.addProduct(this.props.index)}>
                        <Text style={styles.operations}>+</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.child} onPress={ () => this.props.substractProduct(this.props.index)}>
                        <Text style={styles.operations}>-</Text>
                    </TouchableOpacity>
                </View>
            }
       </View>
    )
  }
}

const styles = StyleSheet.create({

    title:{
        fontSize: 14,
        fontWeight:'bold',
        color: "white",
    },
    operations:{
        fontSize: 24,
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
    parentHr:{
        
        color: "white",
        width:'100%'
    },
    child:{
        paddingTop:15,
        paddingBottom:15,
        alignItems:"center",
        width:"20%",
        height:"100%",
        borderColor:"white",
        borderWidth:2,
    },

    touchableContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        backgroundColor: "rgba(0,0,0,0.6)",
        borderRightWidth:0,
        borderLeftWidth:0,
        borderBottomWidth:1,
    },
    details:{
        color:'white'
    },
    
});