import express from 'express'
import handlebars from 'express-handlebars'
import viewsRouter from './router/views.router.js'
import cartsRouter from './router/carts.router.js'
import productsRouter from './router/products.router.js'
import usersRouter from './router/users.router.js'
import mongoViewsRouter from './router/mongo/mongoviews.router.js'
import mongoCartsRouter from './router/mongo/mongocarts.router.js'
import mongoChatRouter from './router/mongo/mongochat.router.js'
import mongoProductsRouter from './router/mongo/mongoproducts.router.js'
import mongoUsersRouter from './router/mongo/mongousers.router.js'
import productsManager from './managers/mongo/mongoProductsManager.js'
import messagesManager from './managers/mongo/mongoMessagesManager.js'
import { __dirname } from './utils.js'
import { Server } from 'socket.io'
import './dbs/config.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

//app.use('/api', viewsRouter)
//app.use('/api/carts', cartsRouter)
//app.use('/api/products', productsRouter)
//app.use('/api/users', usersRouter)

app.use('/api', mongoViewsRouter)
app.use('/api/chat', mongoChatRouter)
app.use('/api/carts', mongoCartsRouter)
app.use('/api/products', mongoProductsRouter)
app.use('/api/users', mongoUsersRouter)

const PORT = 8080

const httpServer = app.listen(PORT, () => {
    console.log(`Listening to port ${ PORT } with Express`)
})

const socketServer = new Server(httpServer)

const messages = []

socketServer.on('connection', (socket) => {

    console.log(`Client connected with id ${ socket.id }`)

    socket.on('disconnect', () => {
        console.log(`Client disconnected with id ${ socket.id }`)
    })

    socket.on('newUser', (userEmail) => {
        socket.broadcast.emit('newUserBroadcast', userEmail)
    })

    socket.on('chatMessage', async(info) => {
        messages.push(info)
        const newMessage = await messagesManager.createOne(info)
        socketServer.emit('chat', newMessage)
    })

    socket.on('createProduct', async(product) => {
        const creatingProduct = await productsManager.createOne(product)
        socket.emit('productCreated', creatingProduct)
    })
    
    socket.on('deleteProduct', async(product) => {
        const newProductsArray = await productsManager.deleteOne(product)
        socket.emit('productDeleted', newProductsArray)
    })

})

// actualizar chat para enviar mensajes a persistencia db mongo, esto en server al hacer el emit?
// 
// en bd ecommerce tener colection products carts messages