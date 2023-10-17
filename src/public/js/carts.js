const socketClient = io()
const createCartForm = document.getElementById('createCartForm')
const deleteCartForm = document.getElementById('deleteCartForm')
const cartId = document.getElementById('cartId')
const deletingCartId = document.getElementById('deletingCartId')
const productsInCart = document.getElementById('productsInCart')
const productId = document.getElementById('productId')
const cTable = document.getElementById('cTable')

createCartForm.onsubmit = (e) => {
    e.preventDefault()
    socketClient.emit('createCart', { cartId })
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

deleteCartForm.onsubmit = (e) => {
    e.preventDefault()
    socketClient.emit('deleteCart', { _id: deletingCartId.value })
}

socketClient.on('cartDeleted', (newCartsArray) => {
    let carts = `<thead>
        <tr>
            <th>Id</th>
            <th>Products</th>
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