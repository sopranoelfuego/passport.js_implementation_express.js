const Joi=require('joi')

module.exports={
 
    validateBody:(schema)=>{
        return (req,res,next)=>{
            const result=Joi.validate(req.body,schema)//return object {value:{req.body,schema}}
        
            if(result.error){
                return res.status(400).json(result.error)
            }
            // if(!req.value){req.value={}}
            // req.value['body']=result.value //this mean that ours data are stolen in req.value.body
            next()

        }
    },
    schema:{
        authSchema:Joi.object().keys({
            email:Joi.string().email().required(),
            password:Joi.string().required()
       })
    }
}