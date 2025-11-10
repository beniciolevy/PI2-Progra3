
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { db } from '../firebase/config';

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
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
        }
      });
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
  }
});
