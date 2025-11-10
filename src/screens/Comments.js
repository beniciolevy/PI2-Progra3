
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Pressable } from 'react-native';
import { db } from '../firebase/config';
import { auth } from '../firebase/config';

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      newComment: ""
    };
  }

  componentDidMount() {
    const postId = this.props.route.params.postId;

    db.collection('posts')
      .doc(postId)
      .onSnapshot(doc => {
        const data = doc.data();
        if (data && data.comments) {
          this.setState({ comments: data.comments });
          
        } else{
          this.setState({comments: []})
        }
      });
  }

  addComment(){
    const postId = this.props.route.params.postId;
    const comment = {
      user: auth.currentUser.email,
      text: this.state.newComment
    }
    let todosComments = this.state.comments
    todosComments.push(comment)
    
    db.collection('posts').doc(postId)
      .update({
        comments: todosComments
      })
      .then(() => this.setState({ newComment: '' }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Comentarios</Text>

        <FlatList
          data={this.state.comments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.commentBox}>
              <Text style={styles.commentUser}>{item.user}</Text>
              <Text>{item.text}</Text>
            </View>
          )}
        />
        <TextInput
          placeholder="Escribí un comentario..."
          value={this.state.newComment}
          onChangeText={(text) => this.setState({ newComment: text })}
          style={styles.input}
          
        />

        <Pressable onPress={() => this.addComment()} style={styles.button} >
          <Text style={styles.buttonText}>Agregar Comentario</Text>
        </Pressable>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10
  },
  commentBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  commentUser: {
    fontWeight: 'bold',
    marginBottom: 4
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 10,
    borderRadius: 5
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    marginTop: 10,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  }

});
