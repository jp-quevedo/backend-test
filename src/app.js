import cookieParser from 'cookie-parser'
import compression from 'express-compression'
import express from 'express'
import handlebars from 'express-handlebars'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import session from 'express-session'

import viewsRouter from './routes/views.router.js'
import cartsRouter from './routes/carts.router.js'
import messagesRouter from './routes/messages.router.js'
import productsRouter from './routes/products.router.js'
import usersRouter from './routes/users.router.js'

import cartsManager from './dao/managers/cartsManager.js'
import chatsManager from './dao/managers/chatsManager.js'
import productsManager from './dao/managers/productsManager.js'
import usersManager from './dao/managers/usersManager.js'

import { __dirname } from './utils.js'
import { Server } from 'socket.io'
import { generateProduct } from './faker.js'
import { ErrorMessages } from './middlewares/errors/error.enum.js'
import CustomError from './middlewares/errors/custom.error.js'
import config from './config/dotenv.config.js'
import './config/db.config.js'
import './config/passport.config.js'

const app = express()
const MONGO_URI = config.mongo_uri
const KEY = config.secret_key
const PORT = config.port

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

app.use(session({
    secret: KEY,
    cookie: { maxAge: 60 * 60 * 1000 },
    store: new MongoStore({
        mongoUrl: MONGO_URI
    })
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', viewsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/messages', messagesRouter)
app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)

app.use(compression())
app.get('/mockingproducts', (req, res) => {
    const mock = []
    for (let i = 0; i < 100; i++) {
        const product = generateProduct()
        mock.push(product)
    }
    res.send(mock)
})

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

const httpServer = app.listen(PORT, () => {
    console.log(`Listening to port ${ PORT } with Express`)
})

const socketServer = new Server(httpServer)

socketServer.on('connection', (socket) => {

    // CARTS
    
    socket.on('createCart', async() => {
        const creatingCart = await cartsManager.createOne()
        socket.emit('cartCreated', creatingCart)
    })

    socket.on('updateCart', async (updatingCartId, productsInAddP) => {
        const findUpdatingCart = await cartsManager.findById(updatingCartId._id)
        if (findUpdatingCart) {
            const { productsInCart } = findUpdatingCart
            const productIndex = findUpdatingCart.productsInCart.findIndex((p) => 
                p.product.equals(productsInAddP.product))
                if (productIndex === -1) {
                    findUpdatingCart.productsInCart.push(productsInAddP)
                    findUpdatingCart.save()
                } else {
                    findUpdatingCart.productsInCart[productIndex].quantity++
                    findUpdatingCart.save()
                }
            const newCartsArray = await cartsManager.findAll()
            socket.emit('cartUpdated', newCartsArray)
        } else {
            return CustomError.createError(ErrorMessages.CART_NOT_FOUND)
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
            return CustomError.createError(ErrorMessages.CART_NOT_FOUND)
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
            return CustomError.createError(ErrorMessages.CART_NOT_FOUND)
        }
    })

    // CHAT

    console.log(`Client connected with id ${ socket.id }`)

    socket.on('disconnect', () => {
        console.log(`Client disconnected with id ${ socket.id }`)
    })

    socket.on('newChatUser', (userEmail) => {
        socket.broadcast.emit('newChatUserBroadcast', userEmail)
    })

    socket.on('chatMessage', async(infoMessage) => {
        const newMessage = await chatsManager.createOne(infoMessage)
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
            return CustomError.createError(ErrorMessages.PRODUCT_NOT_FOUND)
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
            return CustomError.createError(ErrorMessages.PRODUCT_NOT_FOUND)
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
            updatingUser.password = newUserUpdate.password,
            updatingUser.role = newUserUpdate.role,
            updatingUser.usersCart = newUserUpdate.usersCart
            const updateSaved = await updatingUser.save()
            console.log(updateSaved)
            const newUsersUpdated = await usersManager.findAll()
            socket.emit('userUpdated', newUsersUpdated)
        } else {
            return CustomError.createError(ErrorMessages.USER_NOT_FOUND)
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
            return CustomError.createError(ErrorMessages.USER_NOT_FOUND)
        }
    })

})

// update user, logout, github, mail de registro, testear compra