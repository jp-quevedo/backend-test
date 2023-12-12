import { messagesModel } from '../models/chats.model.js'
import BasicManager from './basicManager.js'

class MessagesManager extends BasicManager{

    constructor(){
        super(messagesModel)
    }
    
}

const messagesManager = new MessagesManager()

export default messagesManager