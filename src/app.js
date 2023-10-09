import express from 'express'
import handlebars from 'express-handlebars'
import usersRouter from './router/users.router.js'
import productsRouter from './router/products.router.js'
import cartsRouter from './router/carts.router.js'
import viewsRouter from './router/views.router.js'
import { productsManager } from './ProductManager.js'
import { __dirname } from './utils.js'
import { Server } from 'socket.io'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.use('/api/users', usersRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api', viewsRouter)

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

    socket.on('newUser', (user) => {
        socket.broadcast.emit('newUserBroadcast', user)
    })

    socket.on('chatMessage', (info) => {
        messages.push(info)
        socketServer.emit('chat', messages)
    })

    socket.on('createProduct', async(product) => {
        const creatingProduct = await productsManager.createProduct(product)
        socket.emit('productCreated', creatingProduct)
    })
    
    socket.on('deleteProduct', async(product) => {
        const deletingProduct = await productsManager.deleteProduct(product)
        socket.emit('productDeleted', deletingProduct)
    })

})