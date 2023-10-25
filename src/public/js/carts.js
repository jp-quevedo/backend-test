const socketClient = io()

// CREATE IMPORT

const createCartForm = document.getElementById('createCartForm')
const cartId = document.getElementById('cartId')
const productIdInCreation = document.getElementById('productsInCreation')

// ADD PRODUCTS IMPORT

const updateCartForm = document.getElementById('updateCartForm')
const updatingCartId = document.getElementById('updatingCartId')
const productsInAddP = document.getElementById('productsInAddP')

// DELETE PRODUCTS IMPORT

const deletePFCartForm = document.getElementById('deletePFCartForm')
const deletePFCartId = document.getElementById('deletePFCartId')
const deletingProduct = document.getElementById('deletingProduct')

// DELETE IMPORT

const deleteCartForm = document.getElementById('deleteCartForm')
const deletingCartId = document.getElementById('deletingCartId')

// TABLE IMPORT

const cTable = document.getElementById('cTable')

// CREATE CART EVENT

createCartForm.onsubmit = (e) => {
    e.preventDefault()
    socketClient.emit('createCart', )
}

socketClient.on('cartCreated', (creatingCart) => {
    const { _id, productsInCart } = creatingCart
    const cartRow = `
        <tr>
            <td>${_id}</td>
            <td>${productsInCart}</td>
        </tr>
    `
    cTable.innerHTML += cartRow
})

// ADD PRODUCTS EVENT

updateCartForm.onsubmit = (e) => {
    e.preventDefault()
    if (updatingCartId.value == '' ||
        productsInAddP.value == ''
    ) {
        alert('Some data is missing!')
    } else {
        socketClient.emit('updateCart', { _id: updatingCartId.value }, { product: productsInAddP.value, quantity: 1 })
    }
}

socketClient.on('cartUpdated', (newCartsArray) => {
    let carts = `<thead>
        <tr>
            <th>Cart Id</th>
            <th>Products Id</th>
        </tr>
    </thead>`
    newCartsArray
        .map((objCarts) => 
        carts += `<tr>
            <td>${objCarts._id}</td>
            <td>${objCarts.productsInCart}</td>
        </tr>`)
    cTable.innerHTML = carts
})

// DELETE PRODUCTS EVENT

deletePFCartForm.onsubmit = (e) => {
    e.preventDefault()
    if (deletePFCartId.value == '' ||
    deletingProduct.value == ''
    ) {
        alert('Some data is missing!')
    } else {
        socketClient.emit('deletePFCart', { _id: deletePFCartId.value }, { product: deletingProduct.value, quantity: 1 })
    }
}

socketClient.on('productFCDeleted', (newPFCartsArray) => {
    let carts = `<thead>
        <tr>
            <th>Cart Id</th>
            <th>Products Id</th>
        </tr>
    </thead>`
    newPFCartsArray
        .map((objCarts) => 
        carts += `<tr>
            <td>${objCarts._id}</td>
            <td>${objCarts.productsInCart}</td>
        </tr>`)
    cTable.innerHTML = carts
})

// DELETE CART EVENT

deleteCartForm.onsubmit = (e) => {
    e.preventDefault()
    if (deletingCartId.value == '') {
        alert('Some data is missing!')
    } else {
        socketClient.emit('deleteCart', { _id: deletingCartId.value })
    }
}

socketClient.on('cartDeleted', (newCartsArray) => {
    let carts = `<thead>
        <tr>
            <th>Cart Id</th>
            <th>Products Id</th>
        </tr>
    </thead>`
    newCartsArray
        .map((objCarts) => 
        carts += `<tr>
            <td>${objCarts._id}</td>
            <td>${objCarts.productsInCart}</td>
        </tr>`)
    cTable.innerHTML = carts
})