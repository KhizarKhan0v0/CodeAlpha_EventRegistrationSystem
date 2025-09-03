
const jwt = require('jsonwebtoken')

require('dotenv').config()
const SECRET = process.env.SECRET
function generateToken(user) {
    const payload = {id: user._id, email:user.email}
    // return jwt.sign({email: user.email, password:user.password}, SECRET)
    console.log(payload)
    return jwt.sign(payload, SECRET)
}

function getUser(token) {
    if (!token) {
        return null
    }
    try {
        return jwt.verify(token,SECRET)
    } catch (error) {
        console.error(error)
        return null
    }
}

module.exports = {generateToken, getUser}