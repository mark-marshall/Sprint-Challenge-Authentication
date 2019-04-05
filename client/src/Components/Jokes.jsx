import React, { Component } from 'react';

class Jokes extends Component {
  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.grabJokesAsync();
    }
  }

  render() {
    return (
      <div>
        <h2>Jokes</h2>
        {this.props.jokes.map(joke => (
          <li key={joke.id}>
            <p>joke: {joke.joke}</p>
          </li>
        ))}
      </div>
    );
  }
}

export default Jokes;
