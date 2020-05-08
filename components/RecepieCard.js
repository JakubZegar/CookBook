import React,{Component} from 'react';
import {Text,StyleSheet} from 'react-native';
import { Card, Button, Icon } from 'react-native-elements'

export default class RecepieCard extends Component {

    render() {
        return(
            <Card title={this.props.name} image={this.props.image} 
                containerStyle={{alignItems:"center", justifyContent:"center", width:350, backgroundColor:'rgba(0,0,0,0.7)', borderColor:"transparent", borderRadius:15}}
                imageStyle={{width:300, borderRadius:10, borderWidth:1, borderColor:'rgba(255,255,255,0.5)'}}
                titleStyle={{color:"white",}}
            >
                <Text style={styles.cardTitle}>
                    {this.props.description}
                </Text>
                <Button icon={<Icon name='restaurant' color='#ffffff' />} 
                    buttonStyle={{ borderRadius: 5, borderColor:'rgba(255,255,255,0.5)',borderWidth:1,marginVertical:0, marginBottom: 10, backgroundColor:'rgba(0,0,0,0.65)'}}
                    title='Wyświetl' />
            </Card>
        );
    }
}

const styles = StyleSheet.create({

    cardTitle:{
        alignSelf:"center",
        marginBottom:10,
        color:"white",
    },
})