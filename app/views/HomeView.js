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
            tx.executeSql("drop table if exists locals;"); //Borra la tabla locals
            tx.executeSql("drop table if exists fotos;"); //Borra la tabla fotos
            tx.executeSql( //Crea la tabla locals
                "create table if not exists locals (id integer primary key not null, latitude real, longitude real, name text, imgCab text, dirr text);"
            );
            tx.executeSql("create table if not exists fotos (id integer primary key not null, uri text, idLocals integer);");
            //Inserts
            tx.executeSql("insert into locals (latitude, longitude, name, imgCab, dirr) values (41.449847, 2.247616, ?, ?, ?)", ['Frankfurt Badalona','img005', 'Carrer de Mar, 1, 08911 Badalona, Barcelona']);
            tx.executeSql("insert into locals (latitude, longitude, name, imgCab, dirr) values (41.449331, 2.24709, ?, ?, ?)", ['4 Pedres','img001', 'Carrer de Lleó, 33, 08911 Badalona, Barcelona']);
            tx.executeSql("insert into locals (latitude, longitude, name, imgCab, dirr) values (41.445976, 2.248929, ?, ?, ?)", ['Renfe Badalona','img004', 'Plaça de Roca i Pi, 08912 Badalona, Barcelona']);
            tx.executeSql("insert into locals (latitude, longitude, name, imgCab, dirr) values (41.453516, 2.251103, ?, ?, ?)", ['Restaurant Il Metro','img003', 'Carrer de Sant Bru, 29, 08911 Badalona, Barcelona']);
            tx.executeSql("insert into locals (latitude, longitude, name, imgCab, dirr) values (41.449279, 2.244902, ?, ?, ?)", ['Badalona Pompeu Fabra','img002', 'Plaça Pompeu Fabra, 08912 Badalona, Barcelona']);

            tx.executeSql("insert into fotos (uri, idLocals) values (?, ?)", ['../../assets/img/img001.jpg', 2]);
            tx.executeSql("insert into fotos (uri, idLocals) values (?, ?)", ['../../assets/img/img002.jpg', 5]);
            tx.executeSql("insert into fotos (uri, idLocals) values (?, ?)", ['../../assets/img/img003.jpg', 4]);
            tx.executeSql("insert into fotos (uri, idLocals) values (?, ?)", ['../../assets/img/img004.jpg', 3]);
            tx.executeSql("insert into fotos (uri, idLocals) values (?, ?)", ['../../assets/img/img004.jpg', 1]);
            //Select de los datos
            tx.executeSql("select * from locals", [], (tx,results) => {
                let temp = []; //Array temporal para guardar las filas  
                for(let i=0; i < results.rows.length; i++){ 
                    temp.push(results.rows.item(i));//Añade las filas al temporal
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
                        <Marker key={marker.id} coordinate={{latitude: marker.latitude, longitude: marker.longitude}} 
                        onPress={() => this.props.navigation.navigate('Info', {
                            id: marker.id, //Pasa la id de la marca
                        })} />
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