const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/express-auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
})

const User = mongoose.model('User', userSchema)

module.exports = { User }
