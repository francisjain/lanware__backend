//import express
const express = require('express')

const dataServices = require('./Services/dataServices')

const jwt = require('jsonwebtoken')
//Create app using express
const app = express()

//to communicate with cross plateform
const cors = require('cors')

//parse json
app.use(express.json())

//set port number
app.listen(3000, () => {
    console.log("Server started at 3000");
})

//cors
app.use(cors({
    origin:"http://localhost:4200"
}))


//jwtMiddleware - to valide token(Router specific Middleware)
const jwtMiddleware = (req, res, next) => {
    try {
        const token = req.headers["x-access-token"]
        const data = jwt.verify(token, 'supersecretkey123')
        req.currentId = data.currentId
        //   console.log(req.currentId);
        //   console.log(data);
        next()
    } catch { 
        res.json({
            statusCode: 401,
            status: false,
            message: "please login first"
        })
    }
}



app.post('/login',(req,res)=>{
    dataServices.login(req.body.email,req.body.password).then(result=>{
        res.status(result.statusCode).json(result)
    })
})


app.post('/register',(req,res)=>{
    dataServices.register(req.body.uname,req.body.email,req.body.password,req.body.phone,req.body.date).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/userlist',jwtMiddleware,(req,res)=>{
    dataServices.userlist(req).then(result=>{
        res.status(result.statusCode).json(result)
    })
})