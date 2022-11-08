require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const port = 3000
// app.use(express.urlencoded())
app.use(express.json())

let storedRefreshTokens = []

app.post('/token', async(req,res)=>{
    const bodyToken = req.body.token
    if(!storedRefreshTokens.includes(bodyToken))
        return res.sendStatus(403)
    jwt.verify(bodyToken, process.env.REFRESH_TOKEN, (err,user)=>{
        const accessToken = generateAccessToken({name : user.name})
        res.json({accessToken: accessToken})
    })
})

app.post('/login',(req,res)=>{
    const username = req.body.username
    const user = {name : username}
    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN)
    storedRefreshTokens.push(refreshToken)
    res.json({accessToken : accessToken , refreshToken : refreshToken})
})

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN,{expiresIn : '15s'} )
}

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
app.listen(port)