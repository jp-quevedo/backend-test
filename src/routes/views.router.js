import { Router } from 'express'
import {
    homeRender,
    errorRender,
    loginRender,
    signupRender,
    currentSessionRender
} from '../controllers/views.controller.js'

const router = Router()

router.get('/home', homeRender)
router.get('/error', errorRender)
router.get('/session/login', loginRender)
router.get('/session/signup', signupRender)
router.get('/currentsession', currentSessionRender)

export default router