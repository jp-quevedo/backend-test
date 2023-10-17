const socketClient = io()
const createUserForm = document.getElementById('createUserForm')
const deleteUserForm = document.getElementById('deleteUserForm')
const deletingUserId = document.getElementById('deletingUserId')
const userId = document.getElementById('userId')
const userName = document.getElementById('userName')
const userEmail = document.getElementById('userEmail')
const userPassword = document.getElementById('userPassword')
const uTable = document.getElementById('uTable')

createUserForm.onsubmit = (e) => {
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

deleteUserForm.onsubmit = (e) => {
    e.preventDefault()
    socketClient.emit('deleteUser', { _id: deletingUserId.value })
}

socketClient.on('userDeleted', (newUsersArray) => {
    let users = `<thead>
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
        </tr>
    </thead>`
    newUsersArray
        .map((objUsers) => 
        users += `<tr>
            <td>${objUsers._id}</td>
            <td>${objUsers.name}</td>
            <td>${objUsers.email}</td>
        </tr>`)
    uTable.innerHTML = users
})