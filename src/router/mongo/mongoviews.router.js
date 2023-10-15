import { Router } from 'express'
import productsManager from '../../managers/mongo/mongoProductsManager.js'
import usersManager from '../../managers/mongo/mongoUsersManager.js'

const router = Router()

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.get('/signupresponse/:userId', async(req, res) => {
    const { userId } = req.params
    const user = await usersManager.findById(+userId)
    res.render('signupresponse', { user })
})

router.get('/allusers', async(req, res) => {
    const users = await usersManager.findAll()
    res.render('allusers', { users })
})

router.get('/home', async(req, res) => {
    const products = await productsManager.findAll()
    res.render('home', { products })
})

router.get('/realtimeproducts', async(req, res) => {
    const products = await productsManager.findAll()
    res.render('realTimeProducts', { products })
})

export default router