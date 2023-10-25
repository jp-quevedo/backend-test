const socketClient = io()

// CREATE IMPORT

const createCartForm = document.getElementById('createCartForm')
const cartId = document.getElementById('cartId')
const productIdInCreation = document.getElementById('productsInCreation')

// UPDATE IMPORT

const updateCartForm = document.getElementById('updateCartForm')
const updatingCartId = document.getElementById('updatingCartId')
const productIdInUpdate = document.getElementById('productsInUpdate')

// DELETE IMPORT

const deleteCartForm = document.getElementById('deleteCartForm')
const deletingCartId = document.getElementById('deletingCartId')

// TABLE IMPORT

const cTable = document.getElementById('cTable')

createCartForm.onsubmit = (e) => {
    e.preventDefault()
    socketClient.emit('createCart', [{ productIdInCreation }])
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

updateCartForm.onsubmit = (e) => {
    e.preventDefault()
    socketClient.emit('updateCart', { _id: updatingCartId.value }, { product: productIdInUpdate.value, quantity: 1 })
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

deleteCartForm.onsubmit = (e) => {
    e.preventDefault()
    socketClient.emit('deleteCart', { _id: deletingCartId.value })
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