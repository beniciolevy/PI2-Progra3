import React, { Component } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { auth, db } from '../firebase/config';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            username: "",
            registered: false,
            error: ""
        };
    }

    onSubmit() {
        const { email, password, username } = this.state;

        auth.createUserWithEmailAndPassword(email, password)
        .then(response => {

            db.collection('users').add({
                email: email,
                username: username,
                createdAt: Date.now()
            })
            .then(() => {
                auth.signOut();
                this.setState({ registered: true, error: "" });
                this.props.navigation.navigate('Login');
            })
            .catch(error  => {
                this.setState({ error: "Error al guardar el usuario" });
            });

        })
        .catch(() => {
            this.setState({ error: "No se pudo registrar" });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Registro</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={this.state.email}
                    onChangeText={ text => this.setState({ email: text }) }
                />

                <TextInput
                    style={styles.input}
                    placeholder="Nombre de usuario"
                    value={this.state.username}
                    onChangeText={ text => this.setState({ username: text }) }
                />

                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={ text => this.setState({ password: text }) }
                />

                <Pressable style={styles.button} onPress={()=>this.onSubmit()}>
                    <Text style={styles.buttonText}>Registrarme</Text>
                </Pressable>

                {this.state.error !== "" && (
                    <Text style={styles.error}>{this.state.error}</Text>
                )}

                {this.state.registered && (
                    <Text style={styles.success}>¡Registro exitoso!</Text>
                )}

                <Pressable 
                    style={styles.loginButton}
                    onPress={() => this.props.navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>Ya tengo cuenta</Text>
                </Pressable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:20,
        gap:15
    },
    title:{
        fontSize:28,
        fontWeight:'bold',
        marginBottom:20
    },
    input:{
        width:'80%',
        padding:10,
        borderWidth:1,
        borderColor:'#ccc',
        borderRadius:6,
        marginVertical:8
    },
    button:{
        backgroundColor:'#28a745',
        padding:12,
        borderRadius:6,
        width:'80%',
        alignItems:'center'
    },
    loginButton:{
        backgroundColor:'#ff9500',
        padding:12,
        borderRadius:6,
        width:'80%',
        alignItems:'center',
        marginTop:10
    },
    buttonText:{
        color:'white',
        fontWeight:'bold'
    },
    error:{
        color:'red',
        marginTop:10
    },
    success:{
        color:'green',
        marginTop:10
    }
});
