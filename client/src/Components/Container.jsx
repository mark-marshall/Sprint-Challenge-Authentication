import React, { Component } from 'react';

import axios from '../axios/axios';
import * as url from '../consts/urlConsts';
import Signup from './Signup';
import Signin from './Signin';

class Container extends Component {
  state = {
    userSignUp: {
      username: '',
      password: '',
    },
    userSignIn: {
      username: '',
      password: '',
    },
    jokes: [],
    error: '',
  };

  setError = error => {
    this.setState({
      error,
    });
  };

  setJokes = jokes => {
    this.setState({
      jokes,
    });
  };

  resetUser = () => {
    this.setState({
      user: {
        username: '',
        password: '',
      },
    });
  };

  signUpChangeHandler = event => {
    this.setState({
      userSignUp: {
        ...this.state.userSignUp,
        [event.target.name]: event.target.value,
      },
    });
  };

  signInChangeHandler = event => {
    this.setState({
      userSignIn: {
        ...this.state.userSignIn,
        [event.target.name]: event.target.value,
      },
    });
  };

  setItemLocalStore = (key, value) => {
    localStorage.setItem(key, value);
  };

  clearItemLocalStore = key => {
    localStorage.removeItem(key);
  };

  replaceUrl = path => {
    this.props.history.replace(path);
  };

  fireSignUp = user => {
    this.signUpAsync(user);
    this.resetUser();
  };

  signUpAsync = user => {
    axios()
      .post(url.signUp, user)
      .then(res => {
        const newToken = res.data.token;
        this.setItemLocalStore('token', newToken);
        this.replaceUrl('/users');
      })
      .catch(error => {
        const newError = error.message;
        this.setError(newError);
      });
  };

  fireSignIn = user => {
    this.signInAsync(user);
    this.resetUser();
  };

  signInAsync = user => {
    axios()
      .post(url.signIn, user)
      .then(res => {
        const newToken = res.data.token;
        this.setItemLocalStore('token', newToken);
        this.replaceUrl('/users');
      })
      .catch(error => {
        const newError = error.message;
        this.setError(newError);
      });
  };

  grabJokesAsync = () => {
    axios()
      .get(url.jokes)
      .then(jokes => {
        if (jokes.length > 0) {
          const newJokes = jokes.data;
          this.setJokes(newJokes);
        } else {
          this.setError('we have no jokes');
        }
      })
      .catch(error => {
        const newError = error.message;
        this.setError(newError);
      });
  };

  render() {
    return (
      <div>
        <Signup
          userSignUp={this.state.userSignUp}
          signUpChangeHandler={this.signUpChangeHandler}
          fireSignUp={this.fireSignUp}
        />
        <Signin
          userSignIn={this.state.userSignIn}
          signInChangeHandler={this.signInChangeHandler}
          fireSignIn={this.fireSignIn}
        />
      </div>
    );
  }
}

export default Container;
