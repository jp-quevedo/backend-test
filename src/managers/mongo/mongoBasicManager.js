export default class BasicManager {

    constructor(model, populateOption){
        this.model = model
        this.populateOption = populateOption
    }

    async findAll(){
        return this.model.find().lean()
    }

    async findById(id){
        return this.model.findById({ _id: id })
    }

    async createOne(obj){
        return this.model.create(obj)
    }

    async updateOne(id, obj){
        return this.model.updateOne({ _id: id }, obj)
    }

    async deleteOne(id){
        return this.model.deleteOne({ _id: id })
    }

}