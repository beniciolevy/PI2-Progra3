import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth } from '../firebase/config';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""

        };
    }

    onSubmit() {

        if (this.state.email === "") {
            this.setState({ error: "Ingresá un email" });
            return;
        }

        if (this.state.password === "") {
            this.setState({ error: "Ingresá una contraseña" });
            return;
        }

        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.setState({ error: "" });
                this.props.navigation.navigate("Home");
            })
            .catch(() => {
                this.setState({ error: "Usuario o contraseña incorrectos" });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <Text style={styles.texto}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese su email"
                    value={this.state.email}
                    onChangeText={(text) => this.setState({ email: text })}
                    keyboardType="email-address"
                />
                <Text style={styles.texto}>Contraseña</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese su contraseña"
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(text) => this.setState({ password: text })}
                />

                <Pressable style={styles.button} onPress={() => this.onSubmit()}>
                    <Text style={styles.buttonText}>Ingresar</Text>
                </Pressable>

                {this.state.error !== "" && (
                    <Text style={styles.error}>{this.state.error}</Text>
                )}

                <Pressable onPress={() => this.props.navigation.navigate("Register")}>
                    <Text style={styles.link}>No tengo cuenta</Text>
                </Pressable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20
    },
    title: {
        fontSize: 26,
        marginBottom: 20,
        textAlign: "center"
    },
    texto:{
        alignSelf: 'flex-start',
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginVertical: 8
    },
    button: {
        backgroundColor: "blue",
        padding: 10,
        marginTop: 10
    },
    buttonText: {
        color: "white",
        textAlign: "center"
    },
    error: {
        marginTop: 10,
        color: "red",
        textAlign: "center"
    },
    link: {
        marginTop: 15,
        textAlign: "center",
        color: "blue"
    }
});
