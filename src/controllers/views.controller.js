import cartsManager from '../dao/managers/cartsManager.js'
import productsManager from '../dao/managers/productsManager.js'
import usersManager from '../dao/managers/usersManager.js'
import UsersDTO from '../features/dto/users.dto.js'

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

export const signupRender = async (req, res) => {
    res.render('signup')
}

export const loginRender = async (req, res) => {
    res.render('login')
}

export const signupSuccess = async (req, res) => {
    res.render('signupsuccess', { name: req.user.name })
}

export const currentSessionRender = async (req, res) => {
    const usersDTO = new UsersDTO({ name: req.user.name })
    res.render('currentsession', usersDTO)
}

export const errorRender = async (req, res) => {
    res.render('error')
}