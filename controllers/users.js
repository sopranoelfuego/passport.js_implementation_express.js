const user = require('../database/models/user')
const passport = require('passport')
const Jwt = require('jsonwebtoken')
const { secreteKey } = require('../configuration/conf')


module.exports = {

   signtoken: user => {
      return Jwt.sign({
         iss: 'workflow',
         sub: user.id,
         iat: new Date().getTime(),
         exp: new Date().setDate(new Date().getDate() + 1)

      }, secreteKey)
   },
   signin: async (req, res, next) => {
      res.json({message:'hello welcom to our single'})
   },
   signup: async (req, res, next) => {
      //then as we have all data provided from the client in req.body then we can
      //  const {email,password}=req.body
      console.log(req.body)
      //  const newUser=new user({email,password})
      //  await newUser.save()
      // res.json({user:"created"})
   },
   secrete: async (req, res) => {
      console.log("i am logged")
      res.json({message:"here am logged..."})

   }
}