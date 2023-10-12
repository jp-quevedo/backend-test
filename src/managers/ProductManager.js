import fs from 'fs'

class ProductsManager {

    constructor(path) {
        this.path = path
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify([]))
        }
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const info = await fs.promises.readFile(this.path, 'utf-8')
                const parsedInfo = JSON.parse(info)
                return parsedInfo
            } else {
                return []
            }
        } catch (error) {
            return error
        }
    }
 
    async createProduct(obj) {
        try {
            const products = await this.getProducts()
            let id
            if (products.length === 0) {
                id = 1
            } else {
                id = products[products.length - 1].id + 1
            }
            const newProduct = { id, ...obj }
            products.push(newProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            return newProduct
        } catch (error) {
            return error
        }
    }

    async getProductById(productId) {
        try {
            const products = await this.getProducts({})
            const product = products.find(p => p.id === productId)
            if (product) {
                return product
            } else {
                return 'The product requested does not exist'
            }
        } catch (error) {
            return error
        }
    }

    async deleteProduct(productId) {
        try {
            const products = await this.getProducts()
            const newProducts = products.filter(product => product.id != productId)
            await fs.promises.writeFile(this.path, JSON.stringify(newProducts))
            return true
        } catch (error) {
            return error
        }
    }

    async updateProduct(productId, updatedProduct) {
        try {
            const products = await this.getProducts()
            const product = products.find(product => product.id === productId)
            Object.assign(product, updatedProduct)
            const newProducts = products.map(p => p.id == productId ? product : p)
            await fs.promises.writeFile(this.path, JSON.stringify(newProducts))
        } catch (error) {
            return error
        }
    }

}

export const productsManager = new ProductsManager('./src/dbs/Products.json')