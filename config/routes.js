const axios = require('axios');
const bcrypt = require('bcryptjs');

const { authenticate } = require('../auth/authenticate');
const db = require('../database/dbConfig');
const generateToken = require('../auth/generateToken');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
user = req.body;
if(user.username && user.password) {
  const { password } = req.body;
  // Create hashed pw using bcrypt and multiple hashing rounds
  const hashedPw = bcrypt.hashSync(password, 10);
  user.password = hashedPw;
  // Add user with hashed pw to the database
  db('users')
  .insert(user)
  .then(id => {
    // Create new token for user so they can be auto-logged in on registration
    const token = generateToken(user);
    const { username } = user;
    res.status(201).json({ message: `welcome in ${username}`, token })
  })
} else {
  res.status(400).json({ message: 'please enter a username and password' })
}
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
