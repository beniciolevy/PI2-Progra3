import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { db } from '../firebase/config';

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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>

        <FlatList
          data={this.state.posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <Text style={styles.postOwner}>Publicado por: {item.owner}</Text>
              <Text style={styles.postText}>{item.text}</Text>
            </View>
          )}
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
  }
});
