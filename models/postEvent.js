import mongoose from 'mongoose'

const Schema = mongoose.Schema

const eventSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    date:{
        type: Date
    },
    limitNum:{
        type: Number
    },
    map:{
        type:String
    },
    members:{
        type: Array
    }
})

const Event = mongoose.model('Event', eventSchema)

export default Event
