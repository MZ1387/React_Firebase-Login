import React, { Component } from 'react';
var firebase = require('firebase');

var config = {
  apiKey: "AIzaSyAo8ZY3cBpO6yaMd93ZBYRXmFnQxLlJ6tM",
  authDomain: "react-login-c999f.firebaseapp.com",
  databaseURL: "https://react-login-c999f.firebaseio.com",
  projectId: "react-login-c999f",
  storageBucket: "react-login-c999f.appspot.com",
  messagingSenderId: "349628711566"
};

firebase.initializeApp(config);

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    };

    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(event) {
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);

    promise
    .then(user => {
      var message = `Welcome ${user.email}`;
      var logout = document.getElementById('logout');

      logout.classList.remove('hide');

      this.setState({ message });
    })
    .catch(error => {
      var message = error.message;
      this.setState({ message });
    });
  }

  signUp() {
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, password);

    promise
    .then(user => {
      var message = `Welcome ${user.email}`;

      firebase.database().ref(`/users/${user.uid}`).set({
        email: user.email
      });

      this.setState({ message });
    })
    .catch(error => {
      var message = error.message;
      this.setState({ message });
    })
  }

  logout() {

    firebase.auth().signOut()
    .then(function() {
      console.log('Logged Out');
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <input id='email' ref='email' type='email' placeholder='Enter your email' /><br />
        <input id='password' ref='password' type='password' placeholder='Enter your password' /><br />
        <p>{this.state.message}</p>
        <button onClick={this.login}>Login</button>
        <button onClick={this.signUp}>Sign Up</button>
        <button id='logout' className='hide' onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default Auth;
