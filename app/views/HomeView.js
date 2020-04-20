import React from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; //Importar mapas
import mapStyle from '../../assets/style_map.json'; //Estilos para los mapas, creados por google
import * as SQLite from 'expo-sqlite'; //Importar SQLite

const db = SQLite.openDatabase("db.db"); //Llamada a la base de datos

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
            markers: [], //Guarda la información de los puntos de interes
        };

        db.transaction(tx => {
            tx.executeSql("drop table if exists locals;"); //Borra la tabla
            tx.executeSql( //Crea la tabla
                "create table if not exists locals (id integer primary key not null, latitude real, longitude real, name text);"
            );
            //Inserts
            tx.executeSql("insert into locals (latitude, longitude, name) values (41.449847, 2.247616, ?)", ['Frankfurt Badalona']);
            tx.executeSql("insert into locals (latitude, longitude, name) values (41.449331, 2.24709, ?)", ['4 Pedres']);
            tx.executeSql("insert into locals (latitude, longitude, name) values (41.445976, 2.248929, ?)", ['Renfe Badalona']);
            tx.executeSql("insert into locals (latitude, longitude, name) values (41.453516, 2.251103, ?)", ['Restaurant Il Metro']);
            tx.executeSql("insert into locals (latitude, longitude, name) values (41.449279, 2.244902, ?)", ['Badalona Pompeu Fabra']);
            //Select de los datos
            tx.executeSql("select * from locals", [], (tx,results) => {
                let temp = []; //Array temporal para guardar las filas  
                for(let i=0; i < results.rows.length; i++){ 
                    temp.push(results.rows.item(i));
                }
                console.log(temp);
                this.setState({ markers: temp, }); //Pone el state markers con la info de la BD
            });
        });
    }

    render(){
        return(
            <View>
                <MapView 
                    region={this.state.region}
                    style={styles.sizes}
                    customMapStyle={mapStyle}
                >
                    {this.state.markers.map(marker => ( //Muestra los puntos del mapa
                        <Marker key={marker.id} coordinate={{latitude: marker.latitude, longitude: marker.longitude}} />
                    ))}
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