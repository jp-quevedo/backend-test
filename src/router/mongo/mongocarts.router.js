import { Router } from 'express'
import cartsManager from '../../managers/mongo/mongoCartsManager.js'
import productsManager from '../../managers/mongo/mongoProductsManager.js'

const router = Router()

router.get('/', async(req, res) => {
    const carts = await cartsManager.findAll()
    const products = await productsManager.findAll()
    res.render('carts', { carts, products })
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
    const { productsInCart: [productsInAddP] } = req.body
    try {
        const response = await cartsManager.updateOne(id, productsInAddP)
        if (!response) {
            res.status(400).json({ message: 'Could not find any cart with the id sent' })
        } else {
            console.log(response)
            res.status(200).json({ message: 'Cart updated' })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

export default router