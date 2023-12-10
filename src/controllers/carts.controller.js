import productsManager from '../dao/managers/productsManager.js'
import { 
    findAll,
    findById,
    createOne,
    deleteOne,
    updateOne
} from '../services/carts.service.js'

export const findCarts = async (req, res) => {
    const carts = await findAll()
    if (!carts) {
        res.status(404).json({ message: 'Could not find any cart' })
    } else {
        let productsArray = []
        carts.map(products => {
            let cart = { _id: products._id, products: [] }
            products.productsInCart.map(product => cart.products.push({ title: product.product.title, price: product.product.price }))
            productsArray.push(cart)
        })
        const products = await productsManager.findAll()
        return res.render('carts', { carts, products, productsArray })
    }
}

export const findCartById = async (req, res) => {
    const { _id: id } = req.params
    const cart = await findById(id)
    if (!cart) {
        res.status(404).json({ message: 'Could not find any cart with the id sent' })
    } else {
        res.status(200).json({ message: 'Cart found', cart })
    }
}

export const createCart = async (req, res) => {
    try {
        const newCart = await createOne(req.body)
        res.status(200).json({ message: 'Cart created', cart: newCart })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const deleteCart = async (req, res) => {
    const { _id: id } = req.params
    try {
        const response = await deleteOne(id, req.body)
        if (response === -1) {
            res.status(400).json({ message: 'Could not find any cart with the id sent' })
        } else {
            res.status(200).json({ message: 'Cart deleted' })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const updateCart = async (req, res) => {
    const cartCond = { _id: req.params.id }
    const prodCond = [{ _id: req.body.productsInCart }]
    try {
        const response = await updateOne(cartCond, prodCond)
        if (!response) {
            res.status(400).json({ message: 'Could not find any cart with the id sent' })
        } else {
            console.log(response)
            res.status(200).json({ message: 'Cart updated' })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
}
