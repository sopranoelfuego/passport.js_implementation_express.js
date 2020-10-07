const express = require('express')
const user=require('../database/models/user')
const router = express.Router()
const { Router } = require('express')



module.exports =  (passport)=> {

    router.post('/login', (req, res) => {
        const{email,password}=req.body
        user.findOne({email}, (err, doc) => {
            if (err) {
                res.status(500).send("err occured")
            }
            else {
                if (doc) {
                    res.status(500).send("username already exist...")
                } else {
                    var user = user({
                        username:user
                    })
                   
                    user.save((err, user) => {
                        if (err) {req.status(500).send("database crush the request")}
                        else {
                            res.send(user)
                            
                        }
                    })
                }
            }
        })
    })
    return router

}