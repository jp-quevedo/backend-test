import { Router } from 'express'
import {
    logout,
    localSignup,
    // localLogin,
    githubSignup,
    githubLogin,
} from '../controllers/session.controller.js'
import { findUserById } from '../controllers/users.controller.js'
import passport from 'passport'

const router = Router()

router.get('/logout', logout)

// LOCAL

router.post(
    '/signup',
    passport.authenticate('signup', {
        successRedirect: '/api/users',
        failureRedirect: '/api/error'
    }),
    localSignup
)

router.post(
    '/login',
    passport.authenticate('login', {
        successRedirect: '/api/currentsession',
        failureRedirect: '/api/error'
    }),
    async (req, res) => res.render('login')
)

// GITHUB

router.get('/auth/github', githubSignup)
router.get('/github', githubLogin)
router.get('/:_id', findUserById)

export default router