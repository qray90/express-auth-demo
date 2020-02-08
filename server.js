const express = require('express')
const app = express()

app.use(express.json());

const { User } = require('./models')

app.get('/users', async (req, res) => {
  const userList = await User.find()
  res.send(userList)
})

app.post('/register', async (req, res) => {
  const user = await User.create({
    username: req.body.username,
    password: require('bcrypt').hashSync(req.body.password, 'aeriu8923uiiaaiue8r')
  })

  res.send(user)
})

app.post('/login', async (req, res) => {
  res.send(req.body)
})

app.get('/userInfo', async (req, res) => {
  res.send({
    user: { username: 'admin', password: 'admin' },
    token: 'fake token'
  })
})


app.listen(3001, () => {
  console.log('http://localhost:3001');
})
