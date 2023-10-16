const socketClient = io()
const createForm = document.getElementById('createForm')
const addProductsForm = document.getElementById('addProductsForm')
const deleteForm = document.getElementById('deleteForm')
const cartId = document.getElementById('cartId')
const productsInCart = document.getElementById('productsInCart')
const productId = document.getElementById('productId')
const cartTable = document.getElementById('rtpTable')

createForm.onsubmit = (e) => {
    e.preventDefault()
    const newCart = {
        productsInCart: productsInCart.value
    }
    socketClient.emit('createCart', newCart)
}

socketClient.on('cartCreated', (creatingCart) => {
    const { _id, productsInCart } = creatingCart
    const cartRow = `
        <tr>
            <td>${_id}</td>
            <td>${productsInCart}</td>
        </tr>
    `
    cartTable.innerHTML += cartRow
})

deleteForm.onsubmit = (e) => {
    e.preventDefault()
    socketClient.emit('deleteProduct', { _id: productId.value })
}

socketClient.on('productDeleted', (newProductsArray) => {
    let products = `<thead>
        <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Code</th>
            <th>Price</th>
            <th>Status</th>
            <th>Stock</th>
            <th>Category</th>
        </tr>
    </thead>`
    newProductsArray
        .map((objProducts) => 
        products += `<tr>
            <td>${objProducts._id}</td>
            <td>${objProducts.title}</td>
            <td>${objProducts.description}</td>
            <td>${objProducts.code}</td>
            <td>${objProducts.price}</td>
            <td>${objProducts.status}</td>
            <td>${objProducts.stock}</td>
            <td>${objProducts.category}</td>
        </tr>`)
    rtpTable.innerHTML = products
})