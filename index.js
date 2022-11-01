const { PrismaClient } = require('@prisma/client')
const express = require('express')
const cors = require('cors')
const routes = require('./routes')
//Prisma Client
const prisma = new PrismaClient()
const app = express()
const port = 8000

//Handle Cors, Form Data, and Json
app.use(cors())
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

//Rest API Routes
app.get('/', async (req, res) => {
    res.send({
        message: 'Hello this is API from Express'
    })
})

//Routes API
routes(app)


app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})