import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { db } from '../firebase/config';
import { auth } from '../firebase/config';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    db.collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        let posts = [];
        snapshot.forEach(doc => {
          posts.push({ id: doc.id, ...doc.data() });
        });
        this.setState({ posts: posts });
      });
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
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>

        <FlatList
          data={this.state.posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            let likesArray = item.likes ? item.likes : [];
            let alreadyLiked = auth.currentUser && likesArray.includes(auth.currentUser.email);

            return (
              <View style={styles.post}>
                <Text style={styles.ownerText}>{item.owner} publico esto a las {new Date(item.createdAt).toLocaleString('es-AR' , {hour12: false})}</Text>
                <Text style={styles.postText}>{item.text}</Text>

                <Pressable style={styles.likeButton} onPress={() => alreadyLiked ? this.unlikePost(item.id) : this.likePost(item.id)}>

                  <Text style={styles.likeText}> Me gusta ({likesArray.length}) </Text>

                </Pressable>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20
  },
  post: {
    backgroundColor: '#ffffff',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#cccccc'
  },
  postOwner: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  postText: {
    fontSize: 16
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
  }

});
