require('dotenv').config(); // load .env variables

// export the keys
module.exports = {
    MONGO_URI: String(process.env.MONGO_URI),
    PORT : Number(process.env.PORT),
    CORS_ORIGIN: String(process.env.CORS_ORIGIN)
};