import { messagesModel } from '../../dbs/models/messages.model.js'
import BasicManager from './mongoBasicManager.js'

class MessagesManager extends BasicManager{

    constructor(){
        super(messagesModel)
    }
    
}

const messagesManager = new MessagesManager()

export default messagesManager