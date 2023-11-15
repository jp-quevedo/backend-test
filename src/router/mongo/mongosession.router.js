import usersManager from '../../managers/mongo/mongoUsersManager.js'
import passport from 'passport'
import { Router } from 'express'
// import { compareData, hashData } from '../../utils.js'

const router = Router()

/*
router.post('/signup', async(req, res) => {
    const { name, email, password } = req.body
    const hashedPassword = await hashData(password)
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Some data is missing' })
    }
    try {
        const newUser = await usersManager.createOne({ ...req.body, password: hashedPassword })
        req.user = newUser
        res.redirect('/api/users')
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

router.post('/login', async (req, res) => {
    const { loginEmail, loginPassword } = req.body
    const userInDB = await usersManager.findByEmail(loginEmail)
    if (!userInDB) {
        return res.status(401).json({ message: 'Email or password is wrong' })
    }
    try {
        const comparePassword = await compareData(loginPassword, userInDB.password)
        if (!comparePassword) {
            return res.status(401).json({ message: 'Email or password is wrong' })
        } else {
            req.session['email'] = loginEmail
            req.session['name'] = userInDB.name
            if (loginEmail === 'adminCoder@coder.com' && loginPassword === 'Cod3r123'){
                req.session['isAdmin'] = true
            } else {
                req.session['isAdmin'] = false
            }
            res.redirect('/api/home')
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
})
*/

router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.log('Error destroying session:', error)
        } else {
        res.redirect('/api/session/login')
        }
    })
})

// LOCAL

router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/api/users',
    failureRedirect: '/api/error'
}))

router.post('/login', passport.authenticate('login', {
    successRedirect: '/api/currentsession',
    failureRedirect: '/api/error'
}))

// GITHUB

router.get('/auth/github',
    passport.authenticate('github', { scope: ['user: email']}),
    async (req, res) => {}    
)

router.get('/github', 
    passport.authenticate('github', {
        failureRedirect: '/api/error'
    }),
    (req, res) => {
        req.session.user = req.user
        res.redirect('/api/session/current')
    }
)

router.get('/:_id', async (req, res) => {
    const { _id: userId } = req.params
    try {
        const user = await usersManager.findById(userId)
        res.status(200).json({ message: 'User found', user })
    } catch (error) {
        res.status(500).json({ error })
    }
})

export default router