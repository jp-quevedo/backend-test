const socketClient = io()

const chatForm = document.getElementById('chatForm')
const inputMessage = document.getElementById('chatMessage')
const userName = document.getElementById('chatName')
const chatDiv = document.getElementById('chat')

let user

const { value: email } = Swal.fire({
    title: 'Input email address',
    input: 'email',
    inputLabel: 'Your email address',
    inputPlaceholder: 'Enter your email address'
    }).then((input) => {
        userEmail = input.value,
        userName.innerText = `Chat user: ${ userEmail }`
        socketClient.emit('newUser', userEmail)
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
        userEmail: userEmail,
        message: inputMessage.value
    }
    socketClient.emit('chatMessage', infoMessage)
}

socketClient.on('chat', (newMessage) => {
    const chat = newMessage
        .map((objMessage) => `<p>${ objMessage.userEmail }: ${ objMessage.message }</p>`)
        .join(' ')
    chatDiv.innerHTML = chat
})

// verificar mensaje vacio, enviar socket subir a bd y devolver chat a cliente, el cliente mapea