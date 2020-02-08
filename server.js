const express = require('express')
const app = express()

app.use(express.json());

const { User } = require('./models')

app.get('/users', async (req, res) => {
  const userList = await User.find()
  res.send(userList)
})

app.post('/register', async (req, res) => {
  res.send(req.body)
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
