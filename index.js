


const express = require('express')

const app = express()



const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

let PORT = process.env.port || 3000

app.listen(PORT, ()=>{console.log('listening on port: ' + PORT)})

app.get('/', (req,res)=>{
    console.log("get working")
    res.json({
        message: 'notes application'
    })
})

//configuring the database
const dbConfig = require('./config/database.config')
const mongoose = require('mongoose')
const databaseConfig = require('./config/database.config')

mongoose.Promise = global.Promise

//connecting to database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then( ()=> {
    console.log("successfully connected to the data")
})
.catch( err=>{
    console.log("could not connect to the database", err)
    process.exit()
})

require('./routes/notes.routes')(app)