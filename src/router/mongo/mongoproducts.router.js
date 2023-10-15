import { Router } from 'express'
import productsManager from '../../managers/mongo/mongoProductsManager.js'
import { upload } from '../../middlewares/multer.middleware.js'

const router = Router()

router.get('/', async(req, res) => {
    try {
        const products = await productsManager.findAll(req.query)
        if (!products.length) {
            res.status(200).json({ message: 'Could not find any products' })
        } else {
            res.status(200).json({ message: 'Products found', products })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

router.get('/:productId', async(req, res) => {
    const { productId } = req.params
    try {
        const product = await productsManager.findById(+productId)
        if (!product) {
            res.status(400).json({ message: 'Could not find any product with the id sent' })
        } else {
            res.status(200).json({ message: 'Product found', product })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

router.post('/', upload.single('productimage.jpeg'), async(req, res) => {
    const { title, description, code, price, status, stock, category } = req.body
    if (!title || !description || !code || !price || !status || !stock || !category) {
        return res.status(400).json({ message: 'Some data is missing' });
    }
    try {
        const newProduct = await productsManager.createOne(req.body)
        res.status(200).json({ message: 'Product created', product: newProduct })
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

router.delete('/:productId', async(req, res) => {
    const { productId } = req.params
    try {
        const response = await productsManager.deleteOne(+productId, req.body)
        if (response === -1) {
            res.status(400).json({ message: 'Could not find any product with the id sent' })
        } else {
            res.status(200).json({ message: 'Product deleted' })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

router.put('/:productId', async(req, res) => {
    const { productId } = req.params
    try {
        const response = await productsManager.updateOne(+productId, req.body)
        if (!response) {
            res.status(200).json({ message: 'Product updated' })
        } else {
            res.status(400).json({ message: 'Could not find any product with the id sent' })

        }
    }catch (error) {
        res.status(500).json({ message: error })
    }
})

export default router