require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authCtrl = require('./controllers/authController')
const treasureCtrl = require('./controllers/treasureController')
const auth = require('./middleware/authMiddleware')

const app = express()
const PORT = 4000

const {CONNECTION_STRING, SESSION_SECRET, PORT} = process.env

app.use(express.json())

massive(CONNECTION_STRING).then(db => {
    app.set('db',db)
    console.log('db be mile high clubbin')
})

app.use(
    session({
        resave: true,
        saveUnititailized: false,
        secret: SESSION_SECRET,
        cookie:{
            maxAge: 1000*60*60
        }
    })
)

app.post('/auth/register',authCtrl.register)

app.post('/auth/login',authCtrl.login)

app.get('/auth/logout',authCtrl.logout)

app.get('/api/treasure/dragon',treasureCtrl.dragonTreasure)

app.get('/api/treasure/user',auth.usersOnly, treasureCtrl.getUserTreasure)

app.post('/api/treasure/user',auth.usersOnly, treasureCtrl.addUserTreasure)

app.get('/api/treasure/all', auth.usersOnly, auth.adminsOnly, treasureCtrl.getAllTreasure)

app.listen(PORT, ()=>console.log('Mile High Clubbin'))

