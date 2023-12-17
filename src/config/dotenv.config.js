import dotenv from 'dotenv'

dotenv.config()

export default {
    mongo_uri: process.env.MONGO_URI,
    secret_key: process.env.SECRET_KEY,
    port: process.env.PORT,
    gmail_user: process.env.GMAIL_USER,
    gmail_password: process.env.GMAIL_PASSWORD,
}