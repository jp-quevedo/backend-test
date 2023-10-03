const socketClient = io()

const form = document.getElementById('form')
const inputName = document.getElementById('name')

form.onsubmit = (e) => {
    e.preventDefault()
    const userName = inputName.value
    socketClient.emit('message', userName)
}

socketClient.on('response', info => {
    console.log(`Info sent: ${ info }`)
})