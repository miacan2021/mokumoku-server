import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import adminRoutes from './routes/admin.js'
import Event from './models/postEvent.js'
import dotenv from 'dotenv'
dotenv.config()

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

const PORT = process.env.PORT|| 8000

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL)
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`))
