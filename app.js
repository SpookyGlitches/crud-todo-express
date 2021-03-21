require('dotenv').config()

const express = require('express')
const session = require('express-session')
const uuid = require('uuid')
const app = express()
const port = process.env.port || 3000
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(session({
    secret:process.env.SESSION_SECRET,
    cookie:{
        maxAge: 60000
    },
    saveUninitialized:false,
    resave:false,
    genid: function(req) {
        return uuid.v4() 
    },
}))

app.get('/', (req,res) => res.redirect('/tasks'))
app.use('/accounts', require('./routes/accounts'))
app.use('/tasks', require('./routes/tasks'))

app.listen(port, () => console.log(`App listening in port ${port}`))