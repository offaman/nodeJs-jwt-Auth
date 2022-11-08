const mssql = require('mssql')
const config = require('./dbconfig')

async function getdata(){
    const pool =await mssql.connect(config)
    let info = await pool.request().query('select * from Employee')
    return info.recordsets[0]
}

async function get(req,res){
    const pool = await mssql.connect(config)
    let data = await pool.request().query('select * from Employee')
    res.send(data.recordsets[0])
}

async function getById(req,res){
    const pool = await mssql.connect(config)
    let studentId = req.params.id
    console.log(studentId)
    let data = await pool.request()
    .input('Id',mssql.Int,studentId)
    .execute('studentById')
    res.send(data.recordsets[0])
}

module.exports = {getdata, get, getById}