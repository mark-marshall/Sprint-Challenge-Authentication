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

/* 
[POST] request for user REGISTRATION
Must include:
"username": "string up to 255 chars",
"password": "string up to 255 chars",
A token will be returned on succesful registration
*/
function register(req, res) {
const user = req.body;
const { username, password } = req.body;
// Make a preliminary check to make sure user has the correct shape before hashing
if(username && password) {
  // Create hashed pw using bcrypt and multiple hashing rounds
  const hashedPw = bcrypt.hashSync(password, 10);
  user.password = hashedPw;
  // Add user with hashed pw to the database
  db('users')
  .insert(user)
  .then(id => {
    // Create new token for user so they can be in 'logged in' state on registration
    const token = generateToken(user);
    res.status(201).json({ message: `welcome in ${username}`, token })
  })
  .catch(err => {
    res.status(500).json({ message: 'the user could not be added' })
  })
} else {
  res.status(400).json({ message: 'please enter a username and password' })
}
}

/* 
[POST] request for user LOGIN
Must include:
"username": "string of a valid username",
"password": "string that matches the credentials of the username",
A token will be returned on succesful login
*/
function login(req, res) {
const { username, password } = req.body;
// Make a preliminary check to make sure user has the correct shape before hashing
if(username && password) {
  db('users')
  // Grab the user with the matching username
  .where({ username })
  // As usernames are unique, grab the first one, to move the object out of the array
  .first()
  .then(user => {
    // Hash the password entered by the user and compare it with the one stored in the database
    if(user && bcrypt.compareSync(password, user.password)){
      // Create new token for user so they can access registricted content  with Auth header
      const token = generateToken(user);
      res.status(200).json({ message: `welcome in ${username}`, token })
    } else {
      res.status(401).json({  message: 'invalid credentials' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'the user could not be logged in' })
  })
} else {
  res.status(400).json({ message: 'please enter a username and password' })
}
}

/* 
[GET] request to retrieve jokes array
Must include a header with:
"Authorization": "valid jwt"
*/
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
