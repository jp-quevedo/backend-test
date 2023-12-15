import cartsManager from '../dao/managers/cartsManager.js'
import productsManager from '../dao/managers/productsManager.js'
import { 
    findAll,
    findById,
    deleteOne,
    updateOne,
} from '../features/services/users.service.js'

export const findUsers = async (req, res) => {
    const users = await findAll()
    const carts = await cartsManager.findCarts()
    let productsArray = []
    carts.map(products => {
        let cart = { _id: products._id, products: [] }
        products.productsInCart.map(product => cart.products.push({ title: product.product.title, price: product.product.price }))
        productsArray.push(cart)
    })
    const products = await productsManager.findAll()
    res.render('users', { users, carts, products, productsArray })
}

export const findUserById = async (req, res) => {
    const { _id: id } = req.params
    try {
        const user = await findById(id)
        if (!user) {
        res.status(400).json( {message: 'Could not find any user with the id sent' })
        } else {
        res.status(200).json({ message: 'User found', user })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const deleteUser = async (req, res) => {
    const { _id: id } = req.params
    try {
        const response = await deleteOne(id, req.body)
        if (response === -1) {
            res.status(400).json({ message: 'Could not find any user with the id sent' })
        } else {
            res.status(200).json({ message: 'User deleted' })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const updateUser = async (req, res) => {
    const { _id: id } = req.params
    try {
        const response = await updateOne(id, req.body)
        if (response === -1) {
            res.status(400).json({ message: 'Could not find any user with the id sent' })
        } else {
            res.status(200).json({ message: 'User updated' })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
}