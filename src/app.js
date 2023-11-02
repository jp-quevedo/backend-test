import express from 'express'
import handlebars from 'express-handlebars'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'

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
import mongoSessionRouter from './router/mongo/mongosession.router.js'

import messagesManager from './managers/mongo/mongoMessagesManager.js'
import productsManager from './managers/mongo/mongoProductsManager.js'
import usersManager from './managers/mongo/mongoUsersManager.js'
import cartsManager from './managers/mongo/mongoCartsManager.js'

import { __dirname } from './utils.js'
import { Server } from 'socket.io'
import './dbs/config.js'
import './passport.js'

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

const URI = "mongodb+srv://coderuser:coderpass@codercluster.fg9aj6q.mongodb.net/ecommerce?retryWrites=true&w=majority"

app.use(session({
    secret: 'supersecretkey',
    cookie: {
        maxAge: 60 * 60 * 1000
    },
    store: new MongoStore({
        mongoUrl: URI
    })
}))
app.use(passport.initialize())
app.use(passport.session())

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
app.use('/api/session', mongoSessionRouter)

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

    socket.on('updateProduct', async(newProductUpdate) => {
        const updatingProduct = await productsManager.findById(newProductUpdate._id)
        if (updatingProduct) {
            updatingProduct.title = newProductUpdate.title,
            updatingProduct.description = newProductUpdate.description,
            updatingProduct.code = newProductUpdate.code,
            updatingProduct.price = newProductUpdate.price,
            updatingProduct.status = newProductUpdate.status,
            updatingProduct.stock = newProductUpdate.stock,
            updatingProduct.category = newProductUpdate.category
            const productUpdateSaved = await updatingProduct.save()
            console.log(productUpdateSaved)
            const newProductUpdated = await usersManager.findAll()
            socket.emit('productUpdated', newProductUpdated)
        } else {
            return 'The product requested does not exist'
        }
    })

    socket.on('deleteProduct', async(newProductDelete) => {
        const product = await productsManager.findById(newProductDelete._id)
        if (product) {
            const deletingProduct = await productsManager.deleteOne(newProductDelete._id)
            console.log(deletingProduct)
            const newProductsArray = await productsManager.findAll()
            socket.emit('productDeleted', newProductsArray)
        } else {
            return 'The product requested does not exist'
        }
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
        } else {
            return 'The user requested does not exist'
        }
    })

    socket.on('deleteUser', async(newUserDelete) => {
        const deleteUser = await usersManager.findById(newUserDelete._id)
        console.log(deleteUser)
        if (deleteUser) {
            const deletingUser = await usersManager.deleteOne(newUserDelete._id)
            const newUsersArray = await usersManager.findAll()
            socket.emit('userDeleted', newUsersArray)
        } else {
            return 'The user requested does not exist'
        }
    })

    // CARTS
    
    socket.on('createCart', async() => {
        const creatingCart = await cartsManager.createOne()
        socket.emit('cartCreated', creatingCart)
    })

    socket.on('updateCart', async (updatingCartId, productsInAddP) => {
        const findUpdatingCart = await cartsManager.findById(updatingCartId._id)
        if (findUpdatingCart) {
            const { productsInCart } = findUpdatingCart
            findUpdatingCart.productsInCart.push(productsInAddP)
            findUpdatingCart.save()
            const newCartsArray = await cartsManager.findAll()
            socket.emit('cartUpdated', newCartsArray)
        } else {
            return 'The cart requested does not exist'
        }
    })

    socket.on('deletePFCart', async (deletePFCartId, deletingProductId) => {
        const findCart = await cartsManager.findById(deletePFCartId._id)
        if (findCart) {
            const productIndex = findCart.productsInCart.findIndex(obj => obj.product == deletingProductId.product)
            findCart.productsInCart.splice(productIndex, 1)
            const updateSaved = await findCart.save()
            console.log(updateSaved)
            const newPFCartsArray = await cartsManager.findAll()
            socket.emit('productFCDeleted', newPFCartsArray)
        } else {
            return 'The cart requested does not exist'
        }
    })
    
    socket.on('deleteCart', async(cartDelete) => {
        const cart = await cartsManager.findById(cartDelete._id)
        if (cart) {
            const deletingCart = await cartsManager.deleteOne(cartDelete._id)
            console.log(deletingCart)
            const newCartsArray = await cartsManager.findAll()
            socket.emit('cartDeleted', newCartsArray)
        } else {
            return 'The cart requested does not exist'
        }
    })
})

// como se puede aplicar populate de products en ruta carts
// condicional log in / out en home con passport