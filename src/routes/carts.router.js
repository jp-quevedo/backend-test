import { Router } from 'express'
import {
    findCarts,
    findCartById,
    createCart,
    deleteCart,
    updateCart
} from '../controllers/carts.controller.js'

const router = Router()

router.get('/', findCarts)
router.get('/:_id', findCartById)
router.post('/', createCart)
router.delete('/:_id', deleteCart)
router.put('/:_id', updateCart)

export default router