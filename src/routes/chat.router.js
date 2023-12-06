import { Router } from 'express'
import { 
    chatRender,
    messagePost
} from '../controllers/chat.controller.js'

const router = Router()

router.get('/', chatRender)
router.post('/', messagePost)

export default router