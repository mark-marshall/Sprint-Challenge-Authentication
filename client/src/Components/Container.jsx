import React, { Component } from 'react';

import axios from '../axios/axios';

class Container extends Component {
  state = {
    user: {
      username: '',
      password: '',
    },
  };

  resetUser = () => {
    this.setState({
      user: {
        username: '',
        password: '',
      },
    });
  };

  userChangeHandler = event => {
    this.setState({
      user: {
        ...this.state.user,
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

  render() {
    return <div>Hello World</div>;
  }
}

export default Container;
