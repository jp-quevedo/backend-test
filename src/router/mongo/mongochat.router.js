import messagesManager from '../../managers/mongo/mongoMessagesManager.js'
import { Router } from 'express'

const router = Router()

router.get('/', async(req, res) => {
    res.render('chat')
})

router.post('/', async(req, res) => {
    const { userEmail, message } = req.body
    if (!userEmail || !message) {
        return res.status(400).json({ message: 'Some data is missing' });
    }
    try {
        const newMessage = await messagesManager.messageRegister(req.body)
        res.status(200).json({ message: 'Message posted', chatMessage: newMessage })
    } catch (error) {
        res.status(500).json({ message: error })
    }
    res.render('chat')
})

export default router