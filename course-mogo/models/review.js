const mongoose=require("mongoose");

const schema=mongoose.Schema;

const reviewSchema=new schema({
    comment:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createdat:{
        type:Date,
        default: Date.now()
    }
})

module.exports=mongoose.model("Review",reviewSchema);