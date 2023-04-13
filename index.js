// import express
const express = require('express');

// import dataservice file
const dataservice = require('./service/dataservice.js')

// import cores
const cors = require('cors')

// import jwtwebtoken
const token = require('jsonwebtoken')

// create app
const  app = express()

 // connection string to front end integration
 app.use(cors({origin:'http://localhost:4200'}))

// json to js
app.use(express.json())

// tocken creation
const jwtToken =(req,res,next)=>{
    try{
        // TOCKEN IN HEADERS
        const tocken=req.headers['access_tocken']
        // verify token
        const data =token.verify(tockens,"secret_key")
        // when we using middleware ,it's stuck, then use next()
        next()
    }
    catch{
        res.status(422).json({
        status:false,
        message:"Please login"
        })}
}

                                    // create http requests

// for registration
app.post('/signup',(req,res)=>{
    dataservice.register(req.body.email_ph,req.body.fullname,req.body.uname,req.body.pass,req.body.image_file).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

// for LOGIN
app.post('/login',(req,res)=>{
    dataservice.login(req.body.emails,req.body.pass).then(result=>{
        res.status(result.statusCode).json(result)
    })
})



app.get('/viewAll',(req,res)=>{
    dataservice.viewAll().then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/viewUser',(req,res)=>{
    dataservice.viewUser(req.body.username).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/searchuser',(req,res)=>{
    dataservice.searchUser(req.body.username).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.delete('/deleteuser/:username',(req,res)=>{
    dataservice.deleteAccount(req.params.username).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
// app.post('/viewCurrentUser',(req,res)=>{
//     dataservice.viewCurrentUser(req.body._id).then(result=>{
//         res.status(result.statusCode).json(result)
//     })
// })

// app.post('/home',jwtToken,(req,res)=>{
//     dataservice.home(req.body.)
// })



// create port
app.listen(5050,()=>{console.log("server started at port number 5010");})


