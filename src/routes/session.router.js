import passport from 'passport'
import { Router } from 'express'
import {
    logout,
    localSignup,
    localLogin,
    githubSignup,
    githubLogin,
} from '../controllers/session.controller.js'
import { findUserById } from '../controllers/users.controller.js'

const router = Router()

router.get('/logout', logout)

// LOCAL

router.get('/signup', localSignup)
router.get(
    '/login', 
    passport.authenticate('login', {
        successRedirect: '/api/currentsession',
        // failureRedirect: '/api/error'
    }),
    localLogin
)

// GITHUB

router.get('/auth/github', githubSignup)
router.get('/github', githubLogin)
router.get('/:_id', findUserById)

export default router