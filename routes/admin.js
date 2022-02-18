import express from 'express'
import { createPost, updatePost, deletePost } from '../controllers/admin.js'
const router = express.Router()

router.post('/', createPost)
router.post('/:id', updatePost)
router.delete('/:id', deletePost)

export default router