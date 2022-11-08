require('dotenv').config()
const jwt = require('jsonwebtoken')


function authenticate(req,res, next){
    const header = req.headers['authorization']
    const token = header.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN,(err, user)=>{
        if(err){
            return res.sendStatus(404)
        }
        req.username = user
        next()
    })
}

module.exports = {authenticate}


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQW1hbiIsImlhdCI6MTY2NzAyNjI2OH0.EGrCkU0thMNBxf3-yOlHy5gILk_GFhX7CR5YyEUYSMc

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQW5raXQiLCJpYXQiOjE2NjcwMjk2MzZ9.U0aDW5TO9g2ngE-T2eyg4oomJLTakgpzm6Esksq2avg

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2FjaGluIiwiaWF0IjoxNjY3MDI5NzU5fQ.pPSPb4Xme231e7RrsJ7Jo_G6vPoJ6Mo_qGYVujTVdV0