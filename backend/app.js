require('dotenv').config({ path: './config/.env' })
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Routes
const userRoutes = require("./routes/userRoutes")

// Express
const app = express();

// Connexion à la bdd - sequelize
const db = require('./models')
db.sequelize.sync()

// // Drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and re-sync db.')
// })

// Création du middleware contenant les headers de la réponse
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*') //Access the API from any origin
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  ) //Add headers to requests to the API
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  ) //Methods allowed
  next()
})

// CORS
app.use(cors())

// Pour transformer le corps de la requête en objet JavaScript utilisable (remplace bodyParser)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())

// Routes
app.use("/users", userRoutes)

module.exports = app
