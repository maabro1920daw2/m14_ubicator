import React from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import mapStyle from '../../assets/style_map.json';

//const mapStyle = require('./assets/style_map.json');

export class HomeView extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View>
                <MapView style={styles.sizes} customMapStyle={mapStyle}/>
            </View>            
        );
    }
}

const styles = StyleSheet.create({
    sizes: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});