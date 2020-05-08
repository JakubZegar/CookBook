import React,{Component} from 'react';
import {Text,StyleSheet} from 'react-native';
import { Card, Button, Icon } from 'react-native-elements'


export default class RecepieCard extends Component {

    render() {
        return(
            <Card title={this.props.name} image={this.props.image} 
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam commodo tincidunt tellus nec imperdiet. Duis et consectetur libero. Praesent nec metus et purus feugiat lobortis. Morbi vitae augue at lacus pulvinar laoreet. Aliquam a posuere felis. Nulla tempor libero urna, in posuere turpis suscipit eget. Curabitur fermentum commodo purus, eu venenatis urna maximus ac.
                    Nam varius, arcu ac imperdiet lacinia, urna purus tempus ante, id aliquet mauris mauris eget augue. Sed vitae porta elit, in egestas tellus. Nulla ligula nisl, feugiat sit amet commodo nec, commodo eget erat. Nunc elementum, risus ullamcorper placerat elementum, leo lectus semper erat, sed consectetur mi purus ac arcu. Fusce vehicula posuere luctus. Aliquam a dui et lacus consectetur imperdiet id in nibh. Donec feugiat nec augue eget eleifend. Sed nec quam nisl. Cras pulvinar ante vitae ex gravida luctus. Nam lorem sapien, ornare eu egestas nec, rutrum ut odio.
                    Praesent suscipit, augue ut egestas sodales, odio risus ultricies diam, vitae elementum nulla tellus in sem. Nulla fringilla mattis orci sit amet volutpat. Maecenas ut sollicitudin augue. Sed pellentesque iaculis nunc et imperdiet. Etiam ut finibus turpis, laoreet pulvinar odio. Sed faucibus eleifend commodo. Praesent aliquam mattis mi, quis mollis magna. Etiam varius risus id libero dignissim, et ullamcorper dolor ultricies. Nulla dignissim eleifend ullamcorper. 
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