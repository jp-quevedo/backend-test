import fs from 'fs';

class CartsManager{

    constructor(path){
        this.path = path
        if(!fs.existsSync(this.path)){
            fs.writeFileSync(this.path,JSON.stringify([]))
        }
    }

    async getCarts(queryObj){
        const { limit } = queryObj
        try {
            if(fs.existsSync(this.path)){
                const info = await fs.promises.readFile(this.path,'utf-8')
                const parsedInfo = JSON.parse(info)
                return limit === "5"
                    ? parsedInfo.slice(0,0+5)
                    : parsedInfo
            } else {
                return []
            }
        } catch (error) {
            return error
        }
    }

    async createCart(obj){
        try {
            const carts = await this.getCarts()
            let id
            if(carts.length === 0){
                id = 1
            } else {
                id = carts[carts.length-1].id+1
            }
            const newCart = {id,...obj}
            carts.push(newCart)
            await fs.promises.writeFile(this.path,JSON.stringify(carts))
            return newCart
        } catch (error) {
            return error
        }
    }

    async getCartById(cartId){
        try {
            const carts = await this.getCarts({})
            const cart = carts.find(c=>c.id === cartId)
            if(cart){
                return cart
            } else {
                return 'The cart requested does not exist'
            }
        } catch (error) {
            return error
        }
    }

    async deleteCart(cartId){
        try {
            const carts = await this.getCarts()
            const cart = carts.find(p=>p.id === cartId)
            if(!cart){
                return -1
            }
            const newCartsArray = carts.filter(cart=>cart.id !== cartId)
            await fs.promises.writeFile(this.path,JSON.stringify(newCartsArray))
            return 1
        } catch (error) {
            return error
        }
    }

    async updateCart(cartId,updatedCart){
        try {
            const carts = await this.getCarts()
            const cart = carts.find(cart=>cart.id === cartId)
            Object.assign(cart,updatedCart)
            const newCarts = carts.map(c=>c.id == cartId?cart:p)
            await fs.promises.writeFile(this.path,JSON.stringify(newCarts))
        } catch (error) {
            return error
        }
    }

}

export const cartsManager = new CartsManager('Carts.json')