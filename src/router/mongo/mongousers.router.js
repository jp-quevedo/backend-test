import usersManager from '../../managers/mongo/mongoUsersManager.js'
import cartsManager from '../../managers/mongo/mongoCartsManager.js'
import productsManager from '../../managers/mongo/mongoProductsManager.js'
import { Router } from 'express'

const router = Router()

router.get('/', async(req, res) => {
    const users = await usersManager.findAll()
    const carts = await cartsManager.findCarts()
    let productsArray = []
    carts.map(products => {
        let cart = { _id: products._id, products: [] }
        products.productsInCart.map(product => cart.products.push({ title: product.product.title, price: product.product.price }))
        productsArray.push(cart)
    })
    const products = await productsManager.findAll()
    res.render('users', { users, carts, products, productsArray })
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
})

// router.post('/', async(req, res) => {
//     const { name, email, password } = req.body
//     if (!name || !email || !password) {
//         return res.status(400).json({ message: 'Some data is missing' })
//     }
//     try {
//         const newUser = await usersManager.createOne(req.body)
//         req.user = newUser
//         res.redirect('/api/users')
//     } catch (error) {
//         res.status(500).json({ message: error })
// }
// })

router.delete('/:_id', async(req, res) => {
    const { _id: id } = req.params
    try {
        const response = await usersManager.deleteOne(id, req.body)
        if (response === -1) {
            res.status(400).json({ message: 'Could not find any user with the id sent' })
        } else {
            res.status(200).json({ message: 'User deleted' })
        }
    } catch (error) {
        res.status(500).json({ message: error })
}
})

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
})

export default router