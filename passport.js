const jwtStrategy=require('passport-jwt').Strategy
const passport=require('passport')
const {ExtractJwt}=require('passport-jwt')
const passportLocalStrategy=require('passport-local').Strategy
const { secreteKey } = require('./configuration/conf')
const user=require('./database/models/user')
const GoogleAuthoTokenStrategy=require('passport-google-plus-token')


passport.use(new jwtStrategy({
    jwtFromRequest:ExtractJwt.fromHeader('authorization'),
    secretOrKey:secreteKey
},async (payload,done)=>{

const userfoud =user.findById(payload.sub)
try {
     if(!userFound){
         return done(null,false)
     }
     done(null,userfoud)
} catch (error) {
    done(error,false)
}
}))

passport.use(new passportLocalStrategy(
    {
        usernameField:'email'.trim()
    }, async (email,password,done)=>{
        try {
            const userFound=await user.findOne({"local.email":email})
            
            if(!userFound){
                console.log("user not found in database")

                return done(null,false)
            }
            else {
                console.log('user(in passportLocalStrategy):',userFound)
                 const isMatched=await userFound.isValid(password,userFound.local.password)
                 if(isMatched){
                     return done(null,userFound)
                 }else{
                     return done(null,false)
                 }

            }
            
            
        } catch (error) {
            done(error,false)
        }
        
    }
))
passport.use('googleStrategyToken',new GoogleAuthoTokenStrategy({
 clientID:'234394104834-p3cfnk9hkeu0k356093kf7pqss43l19r.apps.googleusercontent.com',
 clientSecret:'_ush9zy_hb0vOpuhwPV42XnJ'
 
},async (accessToken,refrechToken,profile,done)=>{
    
   console.log("profile :",profile)
    try {
        const userFound=await user.findOne({"google.id":profile.id})
        
        if(userFound){
            return done(null,userFound)
        }
            const newUser=new user({
                method:"google",
                google:{
                    id:profile.id,
                    email:profile.emails[0].value
                }
     
            })
            await newUser.save().then(console.log("user created"))

         return done(null,newUser)
        
    } catch (error) {
        return done(error,false)
        
    }



}) )
module.exports=passport