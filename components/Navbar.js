import React from 'react';
import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from 'react-native-elements';

import Products from '../views/Products';
import Camera from '../views/BarcodeScanner';
import Recepies from '../views/Recepies';



const TabNavigator = createMaterialBottomTabNavigator(
    {
        Recepies:{
            screen:Recepies,
            navigationOptions:{
                tabBarLabel:'Recepies',
                activeColor:'#ffffff',
                inactiveColor:'#ffffff',
                barStyle:{backgroundColor:'rgba(0,0,0,0.15)'},
                tabBarIcon:()=>(
                    <View>
                        <Icon name={'event-note'} size={25} color={'white'}/>
                    </View>
                )
            }
        },

        Camera:{
            screen:Camera,
            navigationOptions:{
                tabBarLabel:'Camera',
                activeColor:'#ffffff',
                inactiveColor:'#ffffff',
                barStyle:{backgroundColor:'rgba(0,0,0,0.15)'},
                tabBarIcon:()=>(
                    <View>
                        <Icon name={'photo-camera'}  color={'white'} size={25}/>
                    </View>
                )
            }
        },

        Products:{
            screen:Products,
            navigationOptions:{
                tabBarLabel:'Products',
                activeColor:'#ffffff',
                inactiveColor:'#ffffff',
                barStyle:{backgroundColor:'rgba(0,0,0,0.15)'},
                tabBarIcon:()=>(
                    <View>
                        <Icon name={'shopping-cart'} color={'white'} size={25}/>
                    </View>
                )
            }
        },

    }
);

export default createAppContainer(TabNavigator);  