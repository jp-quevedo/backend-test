import cartsManager from '../../managers/mongo/mongoCartsManager.js'
import productsManager from '../../managers/mongo/mongoProductsManager.js'
import usersManager from '../../managers/mongo/mongoUsersManager.js'
import { Router } from 'express'

const router = Router()

router.get('/session/login', (req, res) => {
    res.render('login')
})

router.get('/session/signup', (req, res) => {
    res.render('signup')
})

router.get('/error', (req, res) => {
    res.render('error')
})

router.get('/home', async (req, res) => {
    const carts = await cartsManager.findCarts()
    let productsArray = []
    carts.map(products => {
        let cart = { _id: products._id, products: [] }
        products.productsInCart.map(product => cart.products.push({ title: product.product.title, price: product.product.price }))
        productsArray.push(cart)
    })
    const products = await productsManager.findAll()
    const users = await usersManager.findAll()
    res.render('home', { carts, products, productsArray, users, name: req.user.name })
})

export default router