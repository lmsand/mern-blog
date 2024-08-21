import express from 'express'
import { signin, signup } from '../controllers/auth.controller.js'

const router = express.Router()

// post, when you want to create something
router.post('/signup', signup)
router.post('/signin', signin)

export default router
