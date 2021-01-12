const jwt = require('jsonwebtoken')

exports.generateToken = user => {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 1000),
        data: user
    }, process.env.SECRET_KEY)
}

exports.generateRefreshToken = (user) => {
    return jwt.sign({
        data: user,
    }, process.env.REFRESH_KEY)
}