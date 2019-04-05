import React, { Component } from 'react';
import { Route, Redirect, NavLink, withRouter } from 'react-router-dom';

import axios from '../axios/axios';
import * as url from '../consts/urlConsts';
import Signup from './Signup';
import Signin from './Signin';
import Jokes from './Jokes';

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
      userSignUp: {
        username: '',
        password: '',
      },
      userSignIn: {
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
        this.replaceUrl('/jokes');
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
        this.replaceUrl('/jokes');
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
        if (jokes) {
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

  fireSignOut = () => {
    this.clearItemLocalStore('token');
    this.replaceUrl('/signin');
  };

  render() {
    if (this.state.error) {
      return <div>Failed: {this.state.error}</div>;
    } else {
      return (
        <div>
          <nav>
            <NavLink to="/signup">Sign Up</NavLink>
            <NavLink to="/signin">Sign In</NavLink>
            <NavLink to="/jokes">Jokes</NavLink>
            <button onClick={this.fireSignOut}>Sign Out</button>
          </nav>

          <Route
            exact
            path="/"
            render={() =>
              !localStorage.getItem('token') ? (
                <Redirect to="/signin" />
              ) : (
                <Redirect to="/jokes" />
              )
            }
          />

          <Route
            path="/signup"
            render={routeProps => (
              <Signup
                {...routeProps}
                userSignUp={this.state.userSignUp}
                signUpChangeHandler={this.signUpChangeHandler}
                fireSignUp={this.fireSignUp}
              />
            )}
          />

          <Route
            path="/signin"
            render={routeProps => (
              <Signin
                {...routeProps}
                userSignIn={this.state.userSignIn}
                signInChangeHandler={this.signInChangeHandler}
                fireSignIn={this.fireSignIn}
              />
            )}
          />

          <Route
            path="/jokes"
            render={routeProps =>
              !localStorage.getItem('token') ? (
                <Redirect to="/signin" />
              ) : (
                <Jokes
                  {...routeProps}
                  jokes={this.state.jokes}
                  grabJokesAsync={this.grabJokesAsync}
                />
              )
            }
          />
        </div>
      );
    }
  }
}

export default withRouter(Container);
