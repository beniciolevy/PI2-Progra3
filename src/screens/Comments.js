import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text, StyleSheet, FlatList, TextInput, Pressable } from 'react-native';
import { db } from '../firebase/config';
import { auth } from '../firebase/config';

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      newComment: "",
      post: null
    };
  }

  componentDidMount() {
    const postId = this.props.route.params.postId;

    db.collection('posts')
      .doc(postId)
      .onSnapshot(doc => {
        const data = doc.data();
        if (data) {
          this.setState({
            post: {
              id: doc.id,
              owner: data.owner,
              text: data.text,
              likes: data.likes,
              createdAt: data.createdAt 
            },
            comments: data.comments
          });
        } else {
          this.setState({ comments: [] });
        }
      });
  }

  addComment() {
    const postId = this.props.route.params.postId;
    const comment = {
      user: auth.currentUser.email,
      text: this.state.newComment
    };

    db.collection('posts')
      .doc(postId)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion(comment)
      })
      .then(() => this.setState({ newComment: '' }))
      .catch(err => console.log(err));
  }

  likePost(postId) {
    db.collection("posts").doc(postId)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
      })
      .catch(error => console.log(error));
  }

  unlikePost(postId) {
    db.collection("posts").doc(postId)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
      })
      .catch(error => console.log(error));
  }

  render() {
    const alreadyLiked = this.state.post && this.state.post.likes.includes(auth.currentUser.email);

    return (
      <View style={styles.container}>
        {this.state.post && (
          <View style={styles.postCaja}>
            <Text style={styles.postDate}>{this.state.post.owner} posteo esto el {new Date(this.state.post.createdAt).toLocaleString('es-AR', { hour12: false })}</Text>
            <Text style={styles.postText}>{this.state.post.text}</Text>
          

            <Pressable
              style={styles.likeButton}
              onPress={() =>
                alreadyLiked
                  ? this.unlikePost(this.state.post.id)
                  : this.likePost(this.state.post.id)
              }
            >
              <Text style={styles.likeText}>❤️ ({this.state.post.likes.length})</Text>
            </Pressable>
          </View>
        )}

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
          placeholder="Comenta aqui el post..."
          value={this.state.newComment}
          onChangeText={(text) => this.setState({ newComment: text })}
          style={styles.input}
        />

        <Pressable onPress={() => this.addComment()} style={styles.button}>
          <Text style={styles.buttonText}>Publicar Comentario</Text>
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
  postCaja: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff'
  },
  postOwner: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  postText: {
    fontSize: 16,
    marginBottom: 5
  },
  postDate: {
    color: '#666',
    fontSize: 12,
    marginTop: 4
  },
  likeButton: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 6,
    alignSelf: 'flex-start'
  },
  likeText: {
    color: '#007bff',
    fontWeight: 'bold'
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
