import React from 'react';
import { StyleSheet, Dimensions, Text, View, Button, Image } from 'react-native';
import * as SQLite from 'expo-sqlite'; //Importar SQLite
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'; //Importar iconos FontAwesome
import { faCamera } from '@fortawesome/free-solid-svg-icons'; //Icono camara

const db = SQLite.openDatabase("db.db"); //Llamada a la base de datos

export class MarkerView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: JSON.stringify(this.props.route.params.id), //La id del Marker
            imgs: [],
            name: "",
            imgCab: "",
            dir: "",
            good: false,
        };

    }
    componentDidMount() {
        if(!this.state.good){
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
                    this.setState({ name: tempName, imgCab: tempImg, dir: tempDir }); //Pone el state markers con la info de la BD
                });
            });
        }
        this.setState({good: true});
    }

    seleccionImagen(im) {
        const cabeceras = {
            'img001': require('../../assets/img/img001.png'),
            'img002': require('../../assets/img/img002.png'),
            'img003': require('../../assets/img/img003.png'),
            'img004': require('../../assets/img/img004.png'),
            'img005': require('../../assets/img/img005.png'),
        };
        return cabeceras[im];
    }

    /*componentDidUpdate() {
        db.transaction(tx => {
            //Select de los datos
            tx.executeSql("select * from fotos where idLocals=?", [this.state.id], (tx,results) => {
                let temp = []; //Array temporal para guardar las filas  
                for(let i=0; i < results.rows.length; i++){ 
                    temp.push(results.rows.item(i));//Añade las filas al temporal
                }
                console.log(temp);
                this.setState({ imgs: temp, }); //Pone el state markers con la info de la BD
            });<Text style={styles.image}><Image source={} /></Text>
        });       
    }*/
    render() {        
        return(
            <View style={styles.container}>
                <Text style={styles.image}><Image source={this.seleccionImagen(this.state.imgCab)} /></Text>
                <Text style={styles.title}>{this.state.name}</Text> 
                <Text style={styles.dir}>{this.state.dir}</Text>                         
                <FontAwesomeIcon style={styles.icons} icon={faCamera} size={40} 
                onPress={() => this.props.navigation.navigate('Camera', {
                    id: this.state.id, //Pasa la id de la marca
                })}
                />
                {this.state.imgs.map(img => ( //Muestra los puntos del mapa
                    <Text key={img.id}>{img.uri} || {img.idLocals}</Text>
                ))}
            </View>
        );
    }
}
//Estilos MarkerView
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    sizes: {
        width: Dimensions.get('window').width,
        height: '100%',
    },
    icons: {
        color: '#333333',
        bottom: 380,
        left: 370,
    },
    image: {
        flex: 2,
        position: 'relative',
        top: -121,
        width: '100%',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        position: 'relative',
        bottom: 370,
        left: 15,
        lineHeight: 100,
        includeFontPadding: true,
    },
    dir: {
        fontSize: 20,
        left: 19,
        bottom: 395,
    }
});