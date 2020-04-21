import React from 'react';
import { StyleSheet, Dimensions, Text, View, Button } from 'react-native';
import * as SQLite from 'expo-sqlite'; //Importar SQLite
import { Camera } from 'expo-camera'; //Importar la camara

const db = SQLite.openDatabase("db.db"); //Llamada a la base de datos

export class CameraView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: JSON.stringify(this.props.route.params.id), //La id del Marker
        };
    }
    render() {
        return(
            <View>
                <Text>Hola holita vecinito!</Text>
            </View>
        );
    }
}
//Estilos CameraView
const styles = StyleSheet.create({
    sizes: {
        width: Dimensions.get('window').width,
        height: '100%',
    },
});