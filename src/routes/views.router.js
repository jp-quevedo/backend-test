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

router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.log('Error destroying session:', error)
        } else {
            res.redirect('/api/users/login')
        }
    })
})

export default router