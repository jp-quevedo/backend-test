export default class BasicManager {

    constructor(model){
        this.model = model
    }

    async findAll(){
        return this.model.find().lean()
    }

    async findById(id){
        return this.model.findById(id)
    }

    async createOne(obj){
        return this.model.create(obj)
    }

    async updateOne(id, obj){
        return this.model.updateOne({ _id: id }, { obj })
    }

    async deleteOne(id){
        return this.model.deleteOne(id)
    }

    async replaceOne(id, obj){
        return this.model.replaceOne({ _id: id }, { obj })
    }
    
    async findOneAndUpdate(id, obj){
        return this.model.findOneAndUpdate({ _id: id }, { obj })
    }
}