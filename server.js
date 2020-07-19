const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const path = require('path')

const boardRoutes = require('./boards/boardsRouter')
const listRoutes = require('./lists/listsRouter')
const userRoutes = require('./users/usersRouter')

const app = express()
const port = process.env.PORT || 8000
const uri = process.env.ATLAS_URI

app.use(cors())
app.use(express.json())

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const connection = mongoose.connection

connection.once('open', () =>
  console.log('mongoDb connection established succesfully!!!!')
)

if (process.env.NODE_ENV === 'production') {
  console.log(path.__dirname)
  app.use(express.static(path.join(__dirname, './myapp/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './myapp/build/index.html'))
  })
}

app.use('/', boardRoutes)
app.use('/board', listRoutes)
app.use('/user', userRoutes)
// app.use('/users', require('./routers/users'))

app.listen(port, () => console.log(`connected to port ${port}!`))
