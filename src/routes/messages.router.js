import { Router } from 'express'
import { __dirname } from '../utils.js'
import { transporter } from '../nodemailer.js'
import { userMiddleware } from '../middlewares/auth.middleware.js'
import { 
    chatRender,
    messagePost
} from '../controllers/chats.controller.js'

const router = Router()

router.get('/chat', userMiddleware, chatRender)
router.post('/chat', userMiddleware, messagePost)

router.get('/mail', async (req, res) => {
    const options = {
        from: 'quevedo.jpg@gmail.com',
        to: [
            'jpablo58@live.cl'
        ],
        subject: 'nodemailer test',
        text: 'first mail sent through nodemailer',
        attachments: [{ path: __dirname + '/public/images/polo.jpeg' }]
    }
    await transporter.sendMail(options)
    res.send('sending mail')
})

router.get('/signupsuccess', async (req, res) => {
    const { name, email } = req.body
    const options = {
        from: 'quevedo.jpg@gmail.com',
        to: email,
        subject: 'signup',
        html: `<h1>welcome ${ name }</h1>`,
    }
    await transporter.sendMail(options)
    res.send('signup success')
})

export default router