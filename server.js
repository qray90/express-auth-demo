const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

const SECRET = 'aeriu8923uiiaaiue8r'

app.use(express.json());

const { User } = require('./models')

app.get('/users', async (req, res) => {
  const userList = await User.find()
  res.send(userList)
})

app.post('/register', async (req, res) => {
  await User.create({
    username: req.body.username,
    password: req.body.password,
  })

  res.send({ message: 'success' })
})

app.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username })

  if (!user) {
    return res.status('400').send({ message: '用户名错误' })
  }

  if (!require('bcrypt').compareSync(req.body.password, user.password)) {
    return res.status('400').send({ message: '密码无效' })
  }

  // 生成token
  const token = jwt.sign({
    id: user._id,
  }, SECRET)

  res.send({
    user,
    token,
  })
})

app.get('/userInfo', async (req, res) => {
  const raw = String(req.headers.authorization).split(' ').pop()
  const tokenData = await jwt.verify(raw, SECRET)

  const user = await User.findById(tokenData.id)

  res.send(user)
})


app.listen(3001, () => {
  console.log('http://localhost:3001');
})
