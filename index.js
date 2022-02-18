import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import adminRoutes from './routes/admin.js'
import Event from './models/postEvent.js'
import path from 'path'

const app = express()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/admin', adminRoutes)
app.get('/', async(req, res)=>{
  const events = await Event.find().sort({
    date: 'desc' })
    res.status(200).json(events)
  })
  
app.post('/:id', async(req, res) => {
   const { id } = req.params
   const memberArr = req.body
   await Event.findByIdAndUpdate(id, {members: memberArr})
})
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT|| 8000

mongoose.connect(process.env.DB)
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`))
