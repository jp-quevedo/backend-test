const socketClient = io()

const form = document.getElementById('form')
const inputPrice = document.getElementById('price')

form.onsubmit = (e) => {
    e.preventDefault()
    const price = inputPrice.value
    socketClient.emit('text', price)
}

socketClient.on('response', info => {
    console.log(`Info sent: ${ info }`)
})