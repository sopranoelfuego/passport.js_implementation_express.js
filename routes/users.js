var express = require('express')();
const router = require('express-promise-router')()

const user = require('../database/models/user')
const userController = require('../controllers/users')
const { validateBody, schema } = require('../helpers/validationsHelpers');
const { json } = require('body-parser');
const passport = require('passport')
const passportconfiguration=require('../passport');
const { use } = require('passport');


/* GET users listing. */
router.route('/').get((req, res, next) => {
  res.send("welcome again and again")
  next()
})
router.route('/signin').get((req, res, next) => {
  res.render('signin')

})
router.route('/signup').get((req, res, next) => {
  res.render('signup')
  next()
})

router.route('/signup').post(validateBody(schema.authSchema), async (req, res) => {

  const { email, password } = req.body
   console.log(` ${email} and ${password}`)
  const userAllreadyExist = await user.findOne({"local.password":password,"method":"local"})
  
  if (userAllreadyExist) {
    res.status(403).send({ error: "email is already in use" })
  } else {
    const newUser = await new user({
      method:"local".trim(),
      local:{email,password}

      

    })
    await newUser.save().then(console.log("user created.."))
    console.log(newUser)
    const token = userController.signtoken(newUser)
    res.status(200).json({ token })

  }
})
router.route('/signin').post(validateBody(schema.authSchema),passport.authenticate('local',{session:false}),(req,res)=>{
  const token=userController.signtoken(req.user)
  res.status(200).json({message:"great you are succesfuly logged"})
})

router.route('/secrete').get(passport.authenticate('jwt',{session:false}),(req, res) => {
  res.json({message:'here am logged'})
  
})
router.route('/oauth/google').post(passport.authenticate('googleStrategyToken',{session:false}),()=>console.log("welcome to our plateforme..."))
module.exports = router;
