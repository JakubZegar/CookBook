import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNabigation, createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from 'react-native-elements';

import Home from '../views/Home';
import Products from '../views/Products';
import Camera from '../views/Camera';
import Recepies from '../views/Recepies';


const TabNavigator = createMaterialBottomTabNavigator(
    {
        Home:{
            screen:Home,
            navigationOptions:{
                tabBarLabel:'Home',
                activeColor:'#ff0000',
                inactiveColor:'#000000',
                barStyle:{backgroundColor:'#67baf6'},
                tabBarIcon:()=>(
                    <View>
                        <Icon name={'home'} size={30} color={'white'}/>
                    </View>
                )
            }
        },

        Camera:{
            screen:Camera,
            navigationOptions:{
                tabBarLabel:'Camera',
                activeColor:'#ff0000',
                inactiveColor:'#000000',
                barStyle:{backgroundColor:'#67baf6'},
                tabBarIcon:()=>(
                    <View>
                        <Icon name={'photo-camera'}  color={'white'} size={30}/>
                    </View>
                )
            }
        },

        Products:{
            screen:Products,
            navigationOptions:{
                tabBarLabel:'Products',
                activeColor:'#ff0000',
                inactiveColor:'#000000',
                barStyle:{backgroundColor:'#67baf6'},
                tabBarIcon:()=>(
                    <View>
                        <Icon name={'shopping-cart'} color={'white'} size={30}/>
                    </View>
                )
            }
        },

        Recepies:{
            screen:Recepies,
            navigationOptions:{
                tabBarLabel:'Recepies',
                activeColor:'#ff0000',
                inactiveColor:'#000000',
                barStyle:{backgroundColor:'#67baf6'},
                tabBarIcon:()=>(
                    <View>
                        <Icon name={'event-note'} size={30} color={'white'}/>
                    </View>
                )
            }
        },
    }
);

export default createAppContainer(TabNavigator);  

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon:{
        borderColor:'#000000',
        borderStyle:'solid',
        borderWidth: 2,
        borderRadius: 1,
    }
  });