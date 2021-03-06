import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as SQLite from 'expo-sqlite'; //Importar SQLite
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'; //Importar iconos FontAwesome
import { faCamera } from '@fortawesome/free-solid-svg-icons'; //Icono camara

const db = SQLite.openDatabase("db.db"); //Llamada a la base de datos

export class MarkerView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: JSON.stringify(this.props.route.params.id), //La id del Marker
            imgs: [], // Imagenes de los puntos
            name: "", // Nombre del punto
            imgCab: "", // Imagen de cabecera
            dir: "", // Direccion del punto 
        };

    }
    componentDidMount() {
        db.transaction(tx => {
            //Select de los datos
            tx.executeSql("select name, imgCab, dirr from locals where id=?", [this.state.id], (tx,results) => {
                let tempName = "";
                let tempImg = "";
                let tempDir = "";
                for(let i=0; i < results.rows.length; i++){
                    tempName = results.rows.item(i).name;
                    tempImg = results.rows.item(i).imgCab;
                    tempDir = results.rows.item(i).dirr;
                }
                this.setState({ name: tempName, imgCab: tempImg, dir: tempDir }); //Pone el state de los datos con la info de la BD
            });
        });
        db.transaction(tx => {
            //Select de los datos
            tx.executeSql("select uri from fotos where idLocals=?", [this.state.id], (tx,results) => {
                let temp = []; //Array temporal para guardar las filas  
                for(let i=0; i < results.rows.length; i++){ 
                    temp.push(results.rows.item(i));//Añade las filas al temporal
                }
                console.log(temp);
                this.setState({ imgs: temp, }); //Pone el state markers con la info de la BD
            });
        });
    }
    // Funcion para mostrar la imagen de cabecera
    seleccionImagen(im) {
        const cabeceras = {
            'img001': require('../../assets/img/img001.png'),
            'img002': require('../../assets/img/img002.png'),
            'img003': require('../../assets/img/img003.png'),
            'img004': require('../../assets/img/img004.png'),
            'img005': require('../../assets/img/img005.png'),
            'p001': require('../../assets/img/p001.png'),
            'p002': require('../../assets/img/p002.png'),
            'p003': require('../../assets/img/p003.png'),
            'p004': require('../../assets/img/p004.png'),
            'p005': require('../../assets/img/p005.png'),
            'p006': require('../../assets/img/p006.png'),
        };
        return cabeceras[im];
    }

    render() {        
        return(
            <View style={styles.container}>
                <Image source={this.seleccionImagen(this.state.imgCab)} />
                <Text style={styles.title}>{this.state.name}</Text> 
                <Text style={styles.dir}>{this.state.dir}</Text>                         
                <FontAwesomeIcon style={styles.icons} icon={faCamera} size={40} 
                onPress={() => this.props.navigation.navigate('Camera', {
                    id: this.state.id, //Pasa la id de la marca
                })}
                />
                <View style={styles.fotoView}>
                    <Text style={styles.fotoTitle}>Fotos del punto:</Text>
                    <View style={styles.imgView}>
                    {this.state.imgs.map(img => ( //Resultado base de datos fotos
                        <Image key={img.uri} style={styles.fotoImg} source={this.seleccionImagen(img.uri)} />
                    ))}
                    </View>
                </View>

            </View>
        );
    }
}
//Estilos MarkerView
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebedf0',
        width: '100%',        
    },
    icons: {
        color: '#333333',
        marginHorizontal: 370,
        marginTop: 5,
        marginBottom: 15,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        position: 'relative',
        marginHorizontal: 15,
        lineHeight: 70,
        includeFontPadding: true,
    },
    dir: {
        fontSize: 18,
        marginHorizontal: 20,
    },
    fotoView: {
        flex: 2,
        backgroundColor: '#f8f9fa',
    },
    fotoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 15,
        marginTop: 10,
    },
    imgView: {
        flexDirection: "row",
        marginHorizontal: 15,
    },
    fotoImg: {
        width: 120,
        height: 120,
        marginLeft: 7,
        marginTop: 7,
        borderColor: '#ebedf0',
        borderWidth: 2,
    }
});