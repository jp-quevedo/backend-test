import { Router } from 'express'
import cartsManager from '../../managers/mongo/cartsManager.js'

const router = Router()

router.get('/', async(req, res) => {
    try {
        const carts = await cartsManager.findAll(req.query)
        if (!carts.length) {
            res.status(200).json({ message: 'Could not find any carts' })
        } else {
            res.status(200).json({ message: 'Carts found', carts })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

router.get('/:cartId', async(req, res) => {
    const { cartId } = req.params
    try {
        const cart = await cartsManager.findById(+cartId)
        if (!cart) {
            res.status(400).json({ message: 'Could not find any cart with the id sent' })
        } else {
            res.status(200).json({ message: 'Cart found', cart })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

router.post('/', async(req, res) => {
    try {
        const newCart = await cartsManager.createOne()
        res.status(200).json({ message: 'Cart created', cart: newCart })
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

router.post('/:cartId/products/:productId', async(req, res) => {
        const { cartId } = req.params
        const { productId } = req.params
    try {
        await cartsManager.addProductToCart(cartId, productId)
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

router.delete('/:cartId', async(req, res) => {
    const { cartId } = req.params
    try {
        const response = await cartsManager.deleteOne(+cartId, req.body)
        if (response === -1) {
            res.status(400).json({ message: 'Could not find any cart with the id sent' })
        } else {
            res.status(200).json({ message: 'Cart deleted' })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

router.put('/:cartId', async(req, res) => {
    const { cartId } = req.params
    try {
        const response = await cartsManager.updateOne(+cartId, req.body)
        if (!response) {
            res.status(200).json({ message: 'Cart updated' })
        } else {
            res.status(400).json({ message: 'Could not find any cart with the id sent' })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

export default router