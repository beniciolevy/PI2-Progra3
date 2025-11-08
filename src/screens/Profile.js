import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { auth, db } from '../firebase/config';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      posts: []
    };
  }

  componentDidMount() {
    const user = auth.currentUser;
    
    if (user) {
      this.setState({ email: user.email });
      
      db.collection('users')
        .where('email', '==', user.email)
        .onSnapshot(docs => {
          docs.forEach(doc => {
            this.setState({ username: doc.data().username });
          });
        });

      db.collection('posts')
        .where('owner', '==', user.email)
        .onSnapshot(docs => {
          let posts = [];
          docs.forEach(doc => {
            posts.push({
              id: doc.id,
              text: doc.data().text,
              owner: doc.data().owner,
              createdAt: doc.data().createdAt
            });
          });
          this.setState({ posts: posts });
        });
    }
  }

  logout() {
    auth.signOut()  
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch(() => {
        alert('Error al cerrar sesión');
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.userHeader}>
          <Text style={styles.username}>{this.state.username}</Text>
          <Text style={styles.email}>{this.state.email}</Text>
        </View>

        <Text style={styles.sectionTitle}>Últimos posteos</Text>

        <FlatList
          data={this.state.posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <Text style={styles.postText}>{item.text}</Text>
            </View>
          )}
        />

        <Pressable style={styles.logoutButton} onPress={() => this.logout()}>
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </Pressable>
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
  userHeader: {
    marginBottom: 30,
    marginTop: 10
  },
  username: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5
  },
  email: {
    fontSize: 16,
    color: '#666666'
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15
  },
  post: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8
  },
  postText: {
    fontSize: 16
  },
  emptyText: {
    textAlign: 'center',
    color: '#666666',
    marginTop: 20,
    fontSize: 16
  },
  logoutButton: {
    backgroundColor: '#ff6b9d',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center'
  },
  logoutButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16
  }
});
