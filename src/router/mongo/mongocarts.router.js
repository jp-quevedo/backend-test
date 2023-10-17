import { Router } from 'express'
import cartsManager from '../../managers/mongo/mongoCartsManager.js'

const router = Router()

router.get('/', async(req, res) => {
    const carts = await cartsManager.findAll()
    res.render('carts', { carts })
})

router.get('/:_id', async(req, res) => {
    const { _id: id } = req.params
    try {
        const cart = await cartsManager.findById(id)
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

router.post('/:_id/products/:obj', async(req, res) => {
        const { _id: id } = req.params
        const { obj } = req.params
    try {
        await cartsManager.addProductToCart(id, obj)
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

router.delete('/:_id', async(req, res) => {
    const { _id: id } = req.params
    try {
        const response = await cartsManager.deleteOne(id, req.body)
        if (response === -1) {
            res.status(400).json({ message: 'Could not find any cart with the id sent' })
        } else {
            res.status(200).json({ message: 'Cart deleted' })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

router.put('/:_id', async(req, res) => {
    const { _id: id } = req.params
    try {
        const response = await cartsManager.updateOne(id, req.body)
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