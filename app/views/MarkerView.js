import React from 'react';
import { StyleSheet, Dimensions, Text, View, Button } from 'react-native';
import * as SQLite from 'expo-sqlite'; //Importar SQLite
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'; //Importar iconos FontAwesome
import { faCamera } from '@fortawesome/free-solid-svg-icons'; //Icono camara

const db = SQLite.openDatabase("db.db"); //Llamada a la base de datos

export class MarkerView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: JSON.stringify(this.props.route.params.id), //La id del Marker
        };
    }
    render() {
        return(
            <View>
                <Text>{this.state.id}</Text>
                <FontAwesomeIcon style={styles.icons} icon={faCamera} size={25} 
                onPress={() => this.props.navigation.navigate('Camera', {
                    id: this.state.id, //Pasa la id de la marca
                })}
                />
            </View>
        );
    }
}
//Estilos MarkerView
const styles = StyleSheet.create({
    sizes: {
        width: Dimensions.get('window').width,
        height: '100%',
    },
    icons: {
        color: 'red',
    },
});