require('dotenv').config()

const express = require('express')
const jwt = require('jsonwebtoken')
const authenticate = require('./authentication').authenticate
const bcrypt = require('bcrypt')
// console.log(authenticate)

const port = 8000
const app = express()
const databaseOperation = require('./dbOperations')

// app.use(express.urlencoded())
// app.use(express.json())

app.get('/all',authenticate,async(req,res)=>{
    let  data = await databaseOperation.getdata()
    res.send(data)
})

app.listen(port)

// app.get('/',databaseOperation.get)

// app.post('/login',(req,res)=>{
//     const username = req.body.username
//     const user = {name : username}
//     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN)
//     res.json({accessToken : accessToken})
// })


// users = []

// app.post('/adduser', async(req,res)=>{
//     const salt = await bcrypt.genSalt()
//     const hashedpass = await bcrypt.hash(req.body.password, salt)
//     const user = {name : req.body.name , password : hashedpass}
//     users.push(user)
//     console.log(users)
//     res.send({userinfo: user})
// })

// app.post('/user/login', async(req,res)=>{
//     const user = users.find((user)=> user.name == req.body.name)
//     if(user){
//         if(await bcrypt.compare(req.body.password , user.password)){
//             res.send("success")
//         }
//         else{
//             res.status(404).send("wrong pass")
//         }
//     }else{
//         res.status(404).send('Wrong password')
//     }
// })

// app.get('/:id',databaseOperation.getById)

// app.get('/hello', (req, res)=>{
//     console.log("hello world")
//     res.send("heee")
// })
