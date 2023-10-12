const socketClient = io()

const chatForm = document.getElementById('chatForm')
const inputMessage = document.getElementById('chatMessage')
const userName = document.getElementById('chatName')
const chatDiv = document.getElementById('chat')

let user

Swal.fire({
    title: 'Welcome!',
    text: 'What should we call you?',
    input: 'text',
    inputValidator: (value) => {
        if (!value) {
        return 'But we need a name!'
        }
    },
    confirmButtonText: 'Enter',
    }).then((input) => {
    user = input.value,
    userName.innerText = `Chat user: ${ user }`
    socketClient.emit('newUser', user)
})

socketClient.on('newUserBroadcast', (user) => {
    Toastify({
        text: `${ user } connected`,
        duration: 5000,
        style: {
            background: 'linear-gradient(to right, #00b09b, #96c93d)'
        }
      }).showToast()
})

chatForm.onsubmit = (e) => {
    e.preventDefault()
    const infoMessage = {
        name: user,
        message: inputMessage.value
    }
    socketClient.emit('chatMessage', infoMessage)
}

socketClient.on('chat', (messages) => {
    const chat = messages
        .map((objMessage) => `<p>${ objMessage.name }: ${ objMessage.message }</p>`)
        .join(' ')
    chatDiv.innerHTML = chat
})