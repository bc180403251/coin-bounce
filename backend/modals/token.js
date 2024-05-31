const mongoose= require('mongoose');

const {schema}= mongoose

const refreshTokenSchema=({
    token:{type:String, required:tru},
    userId:{type: mongoose.SchemaType.ObjectId, ref:'users'}
},
 {
    timestamps:true
 }
)


module.exports= mongoose.model('Refreshtoken', refreshTokenSchema, 'tokens');