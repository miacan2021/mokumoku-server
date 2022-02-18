import Event from "../models/postEvent.js"
import mongoose from 'mongoose'

export const createPost = async(req, res) => {
   const post = req.body
   const newPost = new Event(post)
   await newPost.save()
   res.status(201).json(newPost)
    }


export const updatePost = async(req, res) => {
    const { id } = req.params
    const { title, description, image, date, limitNum, member, map } = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post ${id}`)
    const editPost = { title, description, image, date, limitNum, member, map, _id: id }
    await Event.findByIdAndUpdate(id, editPost, { new: true })
    res.json(editPost)
}

export const deletePost = async(req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post ${id}`)
    await Event.findByIdAndRemove(id)
    res.json({message: 'Delete'})
}