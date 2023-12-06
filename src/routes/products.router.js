import { Router } from 'express'
import { upload } from '../views/middlewares/multer.middleware.js'
import {
    findProducts,
    findProductById,
    createProduct,
    deleteProduct,
    updateProduct,
    filterProducts,
    aggregationProducts
} from '../controllers/products.controller.js'

const router = Router()

router.get('/', findProducts)
router.get('/:_id', findProductById)
router.post('/', upload.single('productimage.jpeg'), createProduct)
router.delete('/:_id', deleteProduct)
router.put('/:_id', updateProduct)
router.get('/filter', filterProducts)
router.get('/aggregation', aggregationProducts)

export default router