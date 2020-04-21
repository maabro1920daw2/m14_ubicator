import React from 'react';
import { StyleSheet, Dimensions, Text, View, Button } from 'react-native';
import * as SQLite from 'expo-sqlite'; //Importar SQLite

const db = SQLite.openDatabase("db.db"); //Llamada a la base de datos

export class MarkerView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <View>
                <Text>{JSON.stringify(this.props.route.params.id)}</Text>
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
});