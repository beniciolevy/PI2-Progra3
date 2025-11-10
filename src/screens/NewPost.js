import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';

export default class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      error: ''
    };
  }

  handlePost() {
    
    

    if (this.state.text === '') {
      this.setState({ error: 'Debes escribir algo' });
      return;
    }

    if (!auth.currentUser) {
      this.setState({ error: 'Debes estar logueado para publicar' });
      return;
    }
    

    db.collection('posts').add({
      owner: auth.currentUser.email,
      text: this.state.text,
      createdAt: Date.now()
    })
    .then(() => {
      this.setState({
        text: '',
        error: ''
      });
    })
    .catch(() => {
      this.setState({ error: 'Error al publicar' });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nuevo Post</Text>

        <TextInput
          style={styles.input}
          placeholder="Escribe tu post"
          value={this.state.text}
          onChangeText={(text) => this.setState({ text })}
        />

        <Pressable style={styles.button} onPress={() => this.handlePost()}>
          <Text style={styles.buttonText}>Publicar</Text>
        </Pressable>

        {
          this.state.error !== '' ?
          <Text style={styles.error}>{this.state.error}</Text>
          : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },
  error: {
    color: 'red',
    marginTop: 10
  }
});
