import React from 'react';
import { TouchableOpacity, Dimensions, StyleSheet, Image, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite'; //Importar SQLite
import { Camera } from 'expo-camera'; //Importar la camara
import * as Permissions from 'expo-permissions'; //Permisos camara
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'; //Importar iconos FontAwesome
import { faCamera } from '@fortawesome/free-solid-svg-icons'; //Icono camara
const db = SQLite.openDatabase("db.db"); //Llamada a la base de datos


export class CameraView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            path: null,
            id: JSON.stringify(this.props.route.params.id), //La id del Marker
            hasPermission: null,
            type: Camera.Constants.Type.back,
        };
       
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasPermission: status === 'granted' });
    }

    takePicture = async () => {
        if (this.camera) {
          let photo = await this.camera.takePictureAsync();
          db.transaction(tx => {
            tx.executeSql("insert into fotos (uri, idLocals) values (?, ?)", [photo.uri, this.state.id]);
            console.log(this.state.id);
            console.log(photo.uri);
          });
        }
    }
    
    render(){
        const { hasPermission } = this.state
        if (hasPermission === null) {
            return <View />;
        } else if (hasPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1 }} type={this.state.cameraType}
                    ref={ref => {this.camera = ref;}}>
                        <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:20}}>
                            <TouchableOpacity
                                style={{
                                alignSelf: 'flex-end',
                                alignItems: 'center',
                                backgroundColor: 'transparent',
                                }}
                                onPress={()=>this.takePicture()}>
                                <FontAwesomeIcon
                                    icon={faCamera}
                                    style={{ color: "#fff" }}
                                    size={35}
                                />
                            </TouchableOpacity>
                        </View>                   
                    </Camera>
                </View>
            );
        }
    }
}
//Estilos CameraView
const styles = StyleSheet.create({
    sizes: {
        width: Dimensions.get('window').width,
        height: '100%',
    },
});