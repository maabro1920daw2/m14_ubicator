import React from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; //Importar mapas
import mapStyle from '../../assets/style_map.json'; //Estilos para los mapas, creados por google

export class HomeView extends React.Component {
    constructor(props){
        super(props);
        this.state = { //Las coordenadas que se inician al principio
            region: {
                latitude: 41.450390,
                longitude: 2.247568,
                latitudeDelta: 0.0122,
                longitudeDelta: 0.0121,
            },
        };
    }

    render(){
        return(
            <View>
                <MapView 
                    region={this.state.region}
                    style={styles.sizes}
                    customMapStyle={mapStyle}
                >
                    <Marker coordinate={{latitude: 41.449847, longitude: 2.247616}} />
                    <Marker coordinate={{latitude: 41.449331, longitude: 2.24709}} />
                </MapView>
            </View>            
        );
    }
}
//Estilos HomeView
const styles = StyleSheet.create({
    sizes: {
        width: Dimensions.get('window').width,
        height: '100%',
    },
});