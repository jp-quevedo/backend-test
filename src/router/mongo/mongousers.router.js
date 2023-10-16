import { Router } from 'express'
import usersManager from '../../managers/mongo/mongoUsersManager.js'

const router = Router()

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.get('/', async(req, res) => {
    const users = await usersManager.findAll()
    res.render('users', { users })
})

router.get('/:_id', async(req, res) => {
    const { _id: id } = req.params
    try {
        const user = await usersManager.findById(id)
        if (!user) {
        res.status(400).json( {message: 'Could not find any user with the id sent' })
        } else {
        res.status(200).json({ message: 'User found', user })
        }
    } catch (error) {
        res.status(500).json({ message: error })
}
});

router.post('/', async(req, res) => {
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
});

router.delete('/:_id', async(req, res) => {
    const { _id: id } = req.params
    try {
        const response = await usersManager.deleteOne(id)
        if (response === -1) {
            res.status(400).json({ message: 'Could not find any user with the id sent' })
        } else {
            res.status(200).json({ message: 'User deleted' })
        }
        } catch (error) {
            res.status(500).json( {message: error })
}
});

router.put('/:_id', async(req, res) => {
    const { _id: id } = req.params
    try {
    const response = await usersManager.updateOne(id, req.body)
    if (response === -1) {
      res.status(400).json({ message: 'Could not find any user with the id sent' })
    } else {
      res.status(200).json({ message: 'User updated' })
    }
  } catch (error) {
    res.status(500).json({ message: error })
  }
});

export default router