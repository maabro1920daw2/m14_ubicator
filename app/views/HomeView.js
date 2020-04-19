import React from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import MapView from 'react-native-maps';
//Estilos para los mapas, creados por google
import mapStyle from '../../assets/style_map.json';


export class HomeView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
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
                />
            </View>            
        );
    }
}

const styles = StyleSheet.create({
    sizes: {
        width: Dimensions.get('window').width,
        height: '100%',
    },
});