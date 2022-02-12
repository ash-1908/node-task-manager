// get -> all items, 1 task
// post -> new 1 task 
// patch -> 1 task
// delete -> 1 task

const express = require('express')
const app = express()
const port = 5000
require('dotenv').config()
//db
const connectDB = require('./db/connect')
//middleware
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.static('./public'))
app.use(express.json())
app.use(errorHandlerMiddleware)

//routes

app.get('/', (req, res) => {
  res.send('Task Manager App')
})

const tasks = require('./routes/tasks')

app.use('/api/v1/tasks', tasks)
app.use(notFound)


// start the server
const start = async() => {
  try{
    await connectDB(process.env.MONGO_URI)
    app.listen(port, ()=>{
      console.log(`Server is running at port ${port}`)
    })
  } catch(error) {
      console.log(error)
  }
}

start()