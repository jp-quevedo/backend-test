import cartsManager from '../../managers/mongo/mongoCartsManager.js'
import productsManager from '../../managers/mongo/mongoProductsManager.js'
import usersManager from '../../managers/mongo/mongoUsersManager.js'
import { Router } from 'express'

const router = Router()

router.get('/home', async(req, res) => {
    const carts = await cartsManager.findAll()
    const products = await productsManager.findAll()
    const users = await usersManager.findAll()
    res.render('home', { carts, products, users })
})

export default router