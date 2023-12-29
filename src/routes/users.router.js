import { Router } from 'express'
import { logger } from '../utils/winston.js'
import { 
    findUsers,
    findUserById,
    deleteUser,
    updateUser
} from '../controllers/users.controller.js'
import passport from 'passport'
import '../config/passport.config.js'

const router = Router()

router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            logger.error('Error destroying session:', error)
        } else {
            res.redirect('/api/users/login')
        }
    })
})

// LOCAL

router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/api/messages/signupsuccess',
    failureRedirect: '/api/error'
}))

router.post('/login', passport.authenticate('login', {
    successRedirect: '/api/users/current',
    failureRedirect: '/api/error'
}))

// GITHUB

router.get(
    '/github', 
    passport.authenticate('github', { scope: ['user: email']}),
    async (req, res) => {}
)

router.get(
    '/auth/github',
    passport.authenticate('github', {
        failureRedirect: '/api/error'
    }),
    (req, res) => {
        req.session.user = req.user
        res.redirect('/api/users/current')
    }
)

router.get('/', findUsers)
router.get('/:_id', findUserById)
router.delete('/:_id', deleteUser)
router.put('/:_id', updateUser)

export default router