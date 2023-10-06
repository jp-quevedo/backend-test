import { Router } from 'express'
import { usersManager } from '../UserManager.js'
import { productsManager } from '../ProductManager.js'

const router = Router()

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.get('/signupresponse/:userId', async(req, res) => {
    const { userId } = req.params
    const user = await usersManager.getUserById(+userId)
    res.render('signupresponse', { user })
})

router.get('/allusers', async(req, res) => {
    const users = await usersManager.getUsers({})
    res.render('allusers', { users })
})

router.get('/chat', (req, res) => {
    res.render('chat')
})

router.get('/home', async(req, res) => {
    const products = await productsManager.getProducts({})
    res.render('home', { products })
})

router.get('/realtimeproducts', async(req, res) => {
    const products = await productsManager.getProducts({})
    res.render('realTimeProducts', { products })
})

export default router