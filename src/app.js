import express from 'express'
import handlebars from 'express-handlebars'

/*
import viewsRouter from './router/fs/views.router.js'
import cartsRouter from './router/fs/carts.router.js'
import productsRouter from './router/fs/products.router.js'
import usersRouter from './router/fs/users.router.js'
*/

import mongoViewsRouter from './router/mongo/mongoviews.router.js'
import mongoCartsRouter from './router/mongo/mongocarts.router.js'
import mongoChatRouter from './router/mongo/mongochat.router.js'
import mongoProductsRouter from './router/mongo/mongoproducts.router.js'
import mongoUsersRouter from './router/mongo/mongousers.router.js'

import messagesManager from './managers/mongo/mongoMessagesManager.js'
import productsManager from './managers/mongo/mongoProductsManager.js'
import usersManager from './managers/mongo/mongoUsersManager.js'
import cartsManager from './managers/mongo/mongoCartsManager.js'

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

/*
app.use('/api', viewsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)
*/

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

socketServer.on('connection', (socket) => {

    // CHAT

    console.log(`Client connected with id ${ socket.id }`)

    socket.on('disconnect', () => {
        console.log(`Client disconnected with id ${ socket.id }`)
    })

    socket.on('newChatUser', (userEmail) => {
        socket.broadcast.emit('newChatUserBroadcast', userEmail)
    })

    socket.on('chatMessage', async(infoMessage) => {
        const newMessage = await messagesManager.createOne(infoMessage)
        socketServer.emit('chat', newMessage)
    })

    // PRODUCTS

    socket.on('createProduct', async(newProduct) => {
        const creatingProduct = await productsManager.createOne(newProduct)
        socket.emit('productCreated', creatingProduct)
    })

    socket.on('deleteProduct', async(productId) => {
        const deletingProduct = await productsManager.deleteOne(productId)
        console.log(deletingProduct)
        const newProductsArray = await productsManager.findAll()
        socket.emit('productDeleted', newProductsArray)
    })

    // USERS

    socket.on('createUser', async(newUser) => {
        const creatingUser = await usersManager.createOne(newUser)
        socket.emit('userCreated', creatingUser)
    })

    socket.on('updateUser', async(newUserUpdate) => {
        const updatingUser = await usersManager.findById(newUserUpdate._id)
        if (updatingUser) {
            updatingUser.name = newUserUpdate.name,
            updatingUser.email = newUserUpdate.email,
            updatingUser.password = newUserUpdate.password
            const updateSaved = await updatingUser.save()
            console.log(updateSaved)
            const newUsersUpdated = await usersManager.findAll()
            socket.emit('userUpdated', newUsersUpdated)
        }
    })

    socket.on('deleteUser', async(deletingUserId) => {
        const deletingUser = await usersManager.deleteOne(deletingUserId)
        console.log(deletingUser)
        const newUsersArray = await usersManager.findAll()
        socket.emit('userDeleted', newUsersArray)
    })

    // CARTS
    
    socket.on('createCart', async() => {
        const creatingCart = await cartsManager.createOne()
        socket.emit('cartCreated', creatingCart)
    })

    socket.on('updateCart', async (updatingCartId, productsInAddP) => {
        console.log(productsInAddP)
        const findUpdatingCart = await cartsManager.findById(updatingCartId)
        findUpdatingCart.productsInCart.push(productsInAddP)
        findUpdatingCart.save()
    })

    socket.on('deleteCart', async(deletingCartId) => {
        const deletingCart = await cartsManager.deleteOne(deletingCartId)
        console.log(deletingCart)
        const newCartsArray = await cartsManager.findAll()
        socket.emit('cartDeleted', newCartsArray)
    })
})

// rutas, query filter (population), aggregation, pages