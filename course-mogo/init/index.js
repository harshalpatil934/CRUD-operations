const mongoose=require("mongoose");
const data=require("./data.js")
const Course=require("../models/course.js")

//  database ch connection

async function main(){
   mongoose.connect('mongodb://127.0.0.1:27017/SkillShelf');
}

main().then(()=>{
    console.log("connected to Db")
}).catch(err=>{
    console.log(err);
})

const initDb=async()=>{
    await Course.deleteMany({});
    await Course.insertMany(data.data);
    console.log("data was initlized");
}
initDb();