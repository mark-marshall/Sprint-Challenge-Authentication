const jwt = require ('jsonwebtoken');
require('dotenv').config();

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
    }
    const options = {
        expiresIn: '1d',
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, options)
    return token;
}

module.exports = generateToken;
