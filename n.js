require("dotenv").config();

const { generatePassword } = require('./api/utils/bcrypt');

  (async () => {
    const pass = await generatePassword("")
    console.log(pass)
  
})()