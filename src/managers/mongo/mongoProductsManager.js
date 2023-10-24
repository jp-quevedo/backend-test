import { productsModel } from '../../dbs/models/products.model.js'
import BasicManager from './mongoBasicManager.js'

class ProductsManager extends BasicManager{

    constructor(){
        super(productsModel)
    }

    async productsFilter(obj){
        const { limit, page, sort: sortPrice, ...queryFilter } = obj
        const result = await productsModel.paginate(queryFilter, {
            limit,
            page,
            sort: { price: sortPrice === 'asc' ? 1 : -1 },
            lean: true
        })
        const info = { 
            payload: result.totalDocs,
            totalPages: result.totalPages,
            prevLink: result.hasPrevPage
                ? `http://localhost:8080/api/products?page=${result.prevPage}`
                : null,
            nextLink: result.hasNextPage
                ? `http://localhost:8080/api/products?page=${result.nextPage}`
                : null,
        }
        return { info, results: result.docs }
    }

    async aggregation(){
        const response = productsModel.aggregate([
            { $match: { price: { $gt: 5 } } },
            { $group: {
                _id: '$category',
                category_count: { $count: { } },
                price_avg: { $avg: '$price' },
            } },
            { $match: { category_count: { $gt: 2 } } },
            { $sort: { price_avg: 1 } }
        ])
        return response
    }

}

const productsManager = new ProductsManager()

export default productsManager