const socketClient = io()
const addForm = document.getElementById('addForm')
const deleteForm = document.getElementById('deleteForm')
const productId = document.getElementById('productId')
const productTitle = document.getElementById('productTitle')
const productDescription = document.getElementById('productDescription')
const productCode = document.getElementById('productCode')
const productPrice = document.getElementById('productPrice')
const productStatus = document.getElementById('productStatus')
const productStock = document.getElementById('productStock')
const productCategory = document.getElementById('productCategory')
const rtpTable = document.getElementById('rtpTable')

addForm.onsubmit = (e) => {
    e.preventDefault()
    const product = {
        title: productTitle.value,
        description: productDescription.value,
        code: productCode.value,
        price: productPrice.value,
        status: productStatus.value,
        stock: productStock.value,
        category: productCategory.value,
    }
    socketClient.emit('createProduct', product)
}

socketClient.on('productCreated', (product) => {
    const { id, title, description, code, price, status, stock, category } = product
    const productRow = `
        <tr>
            <td>${id}</td>
            <td>${title}</td>
            <td>${description}</td>
            <td>${code}</td>
            <td>${price}</td>
            <td>${status}</td>
            <td>${stock}</td>
            <td>${category}</td>
        </tr>
    `
    rtpTable.innerHTML += productRow
})

deleteForm.onsubmit = (e) => {
    e.preventDefault()
    const product = {
        id: +productId.value,
    }
    socketClient.emit('deleteProduct', product)
}

socketClient.on('productDeleted', (product) => {
    const { id } = product
    const productRow = `
        <tr>
            <td>${ id }</td>
        </tr>
    `
    rtpTable.innerHTML += productRow
})

// para eliminar producto, emitir evento desde cliente para delete product
// enviar id de producto en evento
// servidor recibe y escucha el evento, llama a la funcion delete product del manager
// responder al socket client de producto eliminado
// {"id": 10,"title": "diez","description": "diez","code": "diez","price": 1,"status": true,"stock": 1,"category": "diez"}]