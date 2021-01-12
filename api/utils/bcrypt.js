const bcrypt = require('bcrypt');
const algoritm = "aes-256-gcm"
const secretKey = process.env.SECRET_KEY.substr(0, 32)

exports.generatePassword = (password) => {
    let saltRounds = 10
    return bcrypt.hashSync(password, saltRounds)
}

exports.comparePasswords = async (password, dbPassword) => {
    console.log("old", password);
    console.log("db", dbPassword);
    console.log(bcrypt.compareSync(password, dbPassword))
    return bcrypt.compareSync(password, dbPassword)
}

exports.encrypt = (password) => {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv(algoritm, secretKey, iv)
    const enctypted = Buffer.concat([cipher.update(password)])

    return {
        password: enctypted.toString("hex"),
        key: iv.toString("hex")
    }
}

exports.decrypt = (encrypted) => {
    const { key, password } = encrypted

    const decipher = crypto.createDecipheriv(algoritm, secretKey, Buffer.from(key, "hex"))
    const decrypted = Buffer.concat([decipher.update(Buffer.from(password, "hex"))])

    return decrypted.toString();
}