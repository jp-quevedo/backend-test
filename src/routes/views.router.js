import { Router } from 'express'
import {
    homeRender,
    signupRender,
    loginRender,
    signupSuccess,
    currentSessionRender,
    errorRender
} from '../controllers/views.controller.js'

const router = Router()

router.get('/home', homeRender)
router.get('/users/signup', signupRender)
router.get('/users/login', loginRender)
router.get('/messages/signupsuccess', signupSuccess)
router.get('/users/current', currentSessionRender)
router.get('/error', errorRender)

export default router