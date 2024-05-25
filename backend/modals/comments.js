const mongoose= require('mongoose');

const{Schema}= mongoose;

const commentSchema= new Schema({
    content:{type: String, required:true},
    author:{type:mongoose.Schema.ObjectId, ref:'users'},
    blog:{type: mongoose.Schema.ObjectId, ref:'blogs'}
},
{
    timestamps:true
}
)

module.exports= mongoose.model('comment', commentSchema, 'comments')