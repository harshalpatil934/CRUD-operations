const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Course=require("./models/course.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const multer=require("multer");
const Review=require("./models/review.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });


app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.static("public"));
app.engine("ejs",ejsMate);

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
  res.render("index.ejs",{allcourse});
});

// new
app.get("/courses/new",(req,res)=>{
    res.render("new.ejs");
});






//show

app.get("/courses/:id",async(req,res)=>{
    let {id}=req.params;
    let course=await Course.findById(id).populate("reviews");
    res.render("show.ejs",{course});
    
});

//create

app.post("/courses",upload.single("course[image]"),async(req,res)=>{
  const { name, description, price ,tutor } = req.body.course;
  const course = new Course({
    name,
    description,
    image: '/uploads/'+req.file.filename,
    price,
    tutor
  });
    await course.save();
    console.log(course);
   res.redirect("/courses")
});




//edit
 
app.get("/courses/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let course=await Course.findById(id);
    res.render("edit.ejs",{course});
});

//update

app.put("/courses/:id",upload.single("course[image]"),async(req,res)=>{
    const { id } = req.params;
    const { name, description, price, tutor } = req.body.course;
    // console.log(req.body.course);
    const course = {
        name,
        description,
        price,
        tutor,
    };
    // If a new image is uploaded, add it to update data
    if (req.file) {
        course.image = '/uploads/' + req.file.filename;
    }
    // console.log(course)
    await Course.findByIdAndUpdate(id, course);
    res.redirect(`/courses/${id}`);
});


//DELETE

app.delete("/courses/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedcourse=await Course.findByIdAndDelete(id);
    console.log(deletedcourse);
    res.redirect("/courses");
})

app.get("/about",(req,res)=>{
  res.render("about.ejs");
});

// search

app.get("/search",async (req,res)=>{
 let search =req.query.q;
let [course]=await Course.find({name:`${search}`});
if(course==false){
  res.send("no response");

}
else{
res.render("show.ejs",{course});
console.log(search);
console.log(course);
}});


//delete reviews 

app.delete("/courses/:id/reviews/:reviewsId",async(req,res)=>{
  let {id,reviewsId}=req.params;
  console.log(req.params)
  await Course.findByIdAndUpdate(id,{$pull:{reviews:reviewsId}});
 await Review.findByIdAndDelete(reviewsId);
 res.redirect(`/courses/${id}`);
});

//reviews

app.post("/courses/:id/reviews",async(req,res)=>{
  //  console.log(req.params);
   let course=await Course.findById(req.params.id);
   let review=new Review(req.body.review);

   course.reviews.push(review);

   await course.save();
   await review.save();
   console.log()
    
   res.redirect("/courses/"+req.params.id);
  
})



app.listen(8080,()=>{
    console.log("listning to 8080");
})
