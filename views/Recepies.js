import React,{Component} from 'react';
import {View,Text} from 'react-native';

export default class Recepies extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Text>Recepies screen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });