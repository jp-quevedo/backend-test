const socketClient = io()
const signUpForm = document.getElementById('signUpForm')
const deleteUserForm = document.getElementById('deleteUserForm')
const userId = document.getElementById('userId')
const userName = document.getElementById('userName')
const userEmail = document.getElementById('userEmail')
const userPassword = document.getElementById('userPassword')
const uTable = document.getElementById('uTable')

signUpForm.onsubmit = (e) => {
    e.preventDefault()
    const newUser = {
        name: userName.value,
        email: userEmail.value,
        password: userPassword.value,
    }
    socketClient.emit('createUser', newUser)
}

socketClient.on('userCreated', (creatingUser) => {
    const { _id, name, email, password } = creatingUser
    const userRow = `
        <tr>
            <td>${_id}</td>
            <td>${name}</td>
            <td>${email}</td>
        </tr>
    `
    uTable.innerHTML += userRow
})