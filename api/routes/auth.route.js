import express from 'express'
import { signup } from '../controllers/auth.controller.js'

const router = express.Router()

// post, when you want to create something
router.post('/signup', signup)

export default router
