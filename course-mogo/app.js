const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Course=require("./models/course.js");
const path=require("path");
const methodOverride=require("method-override");


app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
//views setup

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

//  database ch connection

async function main(){
   mongoose.connect('mongodb://127.0.0.1:27017/SkillShelf');
}

main().then(()=>{
    console.log("connected to Db")
}).catch(err=>{
    console.log(err);
})


//index route
app.get("/courses",async (req,res)=>{
  let allcourse= await Course.find({})
  res.render("courses/index.ejs",{allcourse});
});

// new
app.get("/courses/new",(req,res)=>{
    res.render("courses/new.ejs");
});



//show

app.get("/courses/:id",async(req,res)=>{
    let {id}=req.params;
    let course=await Course.findById(id);
    res.render("courses/show.ejs",{course});
    
});

//create

app.post("/courses",async(req,res)=>{
    // let course=req.body.course;
    // console.log(course);
   let course= new Course(req.body.course)
   await course.save();
   res.redirect("/courses")
});

//edit
 
app.get("/courses/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let course=await Course.findById(id);
    res.render("courses/edit.ejs",{course});
});

//update

app.put("/courses/:id",async(req,res)=>{
    let {id}=req.params;
    await Course.findByIdAndUpdate(id,{...req.body.course});
    res.redirect(`/courses/${id}`);
})


//DELETE

app.delete("/courses/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedcourse=await Course.findByIdAndDelete(id);
    console.log(deletedcourse);
    res.redirect("/courses");
})


app.listen(8080,()=>{
    console.log("listning to 8080");
})
