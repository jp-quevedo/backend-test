const socketClient = io()

// UPDATE IMPORT

const updateUserForm = document.getElementById('updateUserForm')
const userIdUpdate = document.getElementById('userIdUpdate')
const userNameUpdate = document.getElementById('userNameUpdate')
const userEmailUpdate = document.getElementById('userEmailUpdate')
const userPasswordUpdate = document.getElementById('userPasswordUpdate')
const userIsAdminUpdate = document.getElementById('userIsAdminUpdate')
const userCartUpdate = document.getElementById('userCartUpdate')

// DELETE IMPORT

const deleteUserForm = document.getElementById('deleteUserForm')
const deletingUserId = document.getElementById('deletingUserId')

// TABLE IMPORT

const usersTable = document.getElementById('usersTable')

// UPDATE EVENT

updateUserForm.onsubmit = (e) => {
    e.preventDefault()
    if (userIdUpdate.value == '' &&
        userNameUpdate.value == '' &&
        userEmailUpdate.value == '' &&
        userPasswordUpdate.value == '' &&
        userIsAdminUpdate.value == '' &&
        userCartUpdate.value == ''
    ) {
        alert('Some data is missing!')
    } else {
        const newUserUpdate = {
            _id: userIdUpdate.value,
            name: userNameUpdate.value,
            email: userEmailUpdate.value,
            password: userPasswordUpdate.value,
            isAdmin: userIsAdminUpdate.value,
            cart: userCartUpdate.value
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
            <th>Is Admin</th>
            <th>Cart Id</th>
        </tr>
    </thead>`
    newUserUpdated
        .map((objUsers) => 
        users += `<tr>
            <td>${objUsers._id}</td>
            <td>${objUsers.name}</td>
            <td>${objUsers.email}</td>
            <td>${objUsers.isAdmin}</td>
            <td>${objUsers.usersCart}</td>
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
            <th>Is Admin</th>
            <th>Cart Id</th>
        </tr>
    </thead>`
    newUsersArray
        .map((objUsers) => 
        users += `<tr>
            <td>${objUsers._id}</td>
            <td>${objUsers.name}</td>
            <td>${objUsers.email}</td>
            <td>${objUsers.isAdmin}</td>
            <td>${objUsers.usersCart}</td>
        </tr>`)
    usersTable.innerHTML = users
})