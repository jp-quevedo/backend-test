const socketClient = io()
const addForm = document.getElementById('addForm')
const deleteForm = document.getElementById('deleteForm')
const updateForm = document.getElementById('updateForm')
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
    const { _id, title, description, code, price, status, stock, category } = product
    const productRow = `
        <tr>
            <td>${_id}</td>
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
    socketClient.emit('deleteProduct', +productId.value)
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