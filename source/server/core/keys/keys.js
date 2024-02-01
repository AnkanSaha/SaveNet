require('dotenv').config() // load .env variables

// export the keys
module.exports = {
  MONGO_URI: `${String(process.env.MONGO_URI)}${String(process.env.DB_NAME)}`,
  PORT: Number(process.env.PORT) || 8000,
  CORS_ORIGIN: String(process.env.CORS_ORIGIN)
}
