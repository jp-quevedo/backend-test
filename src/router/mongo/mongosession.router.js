import usersManager from '../../managers/mongo/mongoUsersManager.js'
import { Router } from 'express'

const router = Router()

router.post('/signup', async(req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Some data is missing' })
    }
    try {
        const newUser = await usersManager.createOne(req.body)
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
        return res.status(400).json({ message: 'User not found!' })
    }
    try {
        req.session['email'] = loginEmail
        req.session['name'] = userInDB.name
        if (loginEmail === 'adminCoder@coder.com' && loginPassword === 'Cod3r123'){
            req.session['isAdmin'] = true
        } else {
            req.session['isAdmin'] = false
        }
        res.redirect('/api/session')
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.log('Error destroying session:', error)
        } else {
        res.redirect('/api/session/login')
        }
    })
})

export default router