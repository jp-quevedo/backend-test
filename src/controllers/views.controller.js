import cartsManager from '../dao/cartsManager.js'
import productsManager from '../dao/productsManager.js'
import usersManager from '../dao/usersManager.js'

export const homeRender = async (req, res) => {
    const carts = await cartsManager.findCarts()
    let productsArray = []
    carts.map(products => {
        let cart = { _id: products._id, products: [] }
        products.productsInCart.map(product => cart.products.push({ title: product.product.title, price: product.product.price }))
        productsArray.push(cart)
    })
    const products = await productsManager.findAll()
    const users = await usersManager.findAll()
    res.render('home', { carts, products, productsArray, users })
}

export const errorRender = async (req, res) => {
    res.render('error')
}

export const loginRender = async (req, res) => {
    res.render('login')
}

export const signupRender = async (req, res) => {
    res.render('signup')
}

export const currentSessionRender = async (req, res) => {
    res.render('currentsession', { name: req.user.name })
}