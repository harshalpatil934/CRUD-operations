const mongoose=require("mongoose");
const review = require("./review");
const Schema=mongoose.Schema;
const Review=require("./review.js");

const courseSchema= new Schema({
    name:{
    type:String,
    required:true
},
   description:{
    type:String,
    required:true
},
    image:{
    type:String,
    required:true
},
    price:{
    type:String,
    required:true
},
    tutor:{
    type:String,
    required:true
}, 
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ]
});

courseSchema.post("findOneAndDelete",async(course)=>{
    if(course){
     await Review.deleteMany({_id:{$in: course.reviews}});
    }
    
});

const Course=mongoose.model("course",courseSchema);



module.exports=Course;