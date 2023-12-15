export default class UsersDTO {
    constructor(obj) {
        this.name = obj.name
        this.email = obj.email
        this.password = obj.password
        this.role = obj.role
    }
}