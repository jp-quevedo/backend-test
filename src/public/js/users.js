const socketClient = io()

// CREATE IMPORT

const createUserForm = document.getElementById('createUserForm')
const userId = document.getElementById('userId')
const userName = document.getElementById('userName')
const userEmail = document.getElementById('userEmail')
const userPassword = document.getElementById('userPassword')

// UPDATE IMPORT

const updateUserForm = document.getElementById('updateUserForm')
const userIdUpdate = document.getElementById('userIdUpdate')
const userNameUpdate = document.getElementById('userNameUpdate')
const userEmailUpdate = document.getElementById('userEmailUpdate')
const userPasswordUpdate = document.getElementById('userPasswordUpdate')

// DELETE IMPORT

const deleteUserForm = document.getElementById('deleteUserForm')
const deletingUserId = document.getElementById('deletingUserId')

// TABLE IMPORT

const usersTable = document.getElementById('usersTable')

// CREATE EVENT

createUserForm.onsubmit = (e) => {
    e.preventDefault()
    if (userName.value == '' &&
        userEmail.value == '' &&
        userPassword.value == ''
    ) {
        alert('Some data is missing!')
    } else {
        const newUser = {
            name: userName.value,
            email: userEmail.value,
            password: userPassword.value,
        }
        socketClient.emit('createUser', newUser)
    }
}

socketClient.on('userCreated', (creatingUser) => {
    const { _id, name, email } = creatingUser
    const userRow = `
        <tr>
            <td>${_id}</td>
            <td>${name}</td>
            <td>${email}</td>
        </tr>
    `
    usersTable.innerHTML += userRow
})

// UPDATE EVENT

updateUserForm.onsubmit = (e) => {
    e.preventDefault()
    if (userIdUpdate.value == '' &&
        userNameUpdate.value == '' &&
        userEmailUpdate.value == '' &&
        userPasswordUpdate.value == ''
    ) {
        alert('Some data is missing!')
    } else {
        const newUserUpdate = {
            _id: userIdUpdate.value,
            name: userNameUpdate.value,
            email: userEmailUpdate.value,
            password: userPasswordUpdate.value,
        }
        socketClient.emit('updateUser', newUserUpdate)
    }
}

socketClient.on('userUpdated', (newUserUpdated) => {
    let users = `<thead>
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
        </tr>
    </thead>`
    newUserUpdated
        .map((objUsers) => 
        users += `<tr>
            <td>${objUsers._id}</td>
            <td>${objUsers.name}</td>
            <td>${objUsers.email}</td>
        </tr>`)
    usersTable.innerHTML = users
})

// DELETE EVENT

deleteUserForm.onsubmit = (e) => {
    e.preventDefault()
    if (deletingUserId.value == '') {
        alert('Some data is missing!')
    } else {
        const newUserDelete = { _id: deletingUserId.value }
    socketClient.emit('deleteUser', newUserDelete)
    }
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
    usersTable.innerHTML = users
})