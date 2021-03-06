const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost:27017/express-auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String, set(val) {
    return bcrypt.hashSync(val, 10)
  } },
})

const User = mongoose.model('User', userSchema)

module.exports = { User }
