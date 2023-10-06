const socketClient = io()
const productForm = document.getElementById('productForm')
const productTitle = document.getElementById('productTitle')
const productDescription = document.getElementById('productDescription')
const productCode = document.getElementById('productCode')
const productPrice = document.getElementById('productPrice')
const productStatus = document.getElementById('productStatus')
const productStock = document.getElementById('productStock')
const productCategory = document.getElementById('productCategory')
const rtpTable = document.getElementById('rtpTable')

productForm.onsubmit = (e) => {
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