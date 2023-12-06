import multer from 'multer'
import { __dirname } from '../../services/utils.js'

export const upload = multer({ dest: __dirname + '/public/images/' })