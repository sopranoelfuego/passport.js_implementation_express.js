const mongoose = require('mongoose')
const schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const passport = require('passport')
const { string } = require('joi')


var userSchema =  new schema({
    method:{
      type:String,
      enum:["local","facebook","google"],
      required:true

    },
    local :{
        
        email: {
            
            type: String,
            lowercase:true
    
        },
        password: {
            type: String

        }
    },
    google :{
        id:{
            type:String
        },
        email:{
            type:String,
            lowercase:true
        }
    },
    facebook:{
        id:{
            type:String,

        },
        email:{
            type:String,
            lowercase:true
        }
    }


})
userSchema.pre("save",function(next){
    
   if(this.method=="local"){
       this.local.password=bcrypt.hashSync(this.local.password,bcrypt.genSaltSync(10))
       next()
   }else {
       next()
   }

    
})
userSchema.methods.isValid=(enteredPassword,hashedPassword)=> bcrypt.compareSync(enteredPassword,hashedPassword)


module.exports = mongoose.model('user', userSchema)


