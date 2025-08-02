const express=require("express");
const app=express();
const mysql=require("mysql2");
const path=require("path");
const methodOverride = require('method-override');
const ejsMate=require("ejs-mate");


app.use(methodOverride('_method'));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.static("public"));
app.engine("ejs",ejsMate);

const connection =mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"courses",
    password:"harshal",

});

// initilizing db

// let q="insert into courses (id ,name , description, image, price, tutor) values ? ";
// const sampleCoursesValues = [
//   [1, "Mastering React for Beginners", "Hands-on React.js course covering components, hooks, routing, and state management.", "https://tse1.mm.bing.net/th/id/OIP.blX7FtZYRfVrF4GWe6AihAHaEL?rs=1&pid=ImgDetMain&o=7&rm=3", "1499", "Ananya Sharma"],
//   [2, "Python for Data Analysis", "Analyze and visualize data using Pandas, Matplotlib, and Seaborn.", "https://tse1.mm.bing.net/th/id/OIP.blX7FtZYRfVrF4GWe6AihAHaEL?rs=1&pid=ImgDetMain&o=7&rm=3", "1299", "Rahul Verma"],
//   [3, "Full Stack Web Development", "Build websites with HTML, CSS, JavaScript, Node.js, and MongoDB.", "https://tse1.mm.bing.net/th/id/OIP.blX7FtZYRfVrF4GWe6AihAHaEL?rs=1&pid=ImgDetMain&o=7&rm=3", "1999", "Aman Raj"],
//   [4, "UI/UX Design Bootcamp", "Learn Figma, Adobe XD, and UX design principles with real projects.", "https://tse1.mm.bing.net/th/id/OIP.blX7FtZYRfVrF4GWe6AihAHaEL?rs=1&pid=ImgDetMain&o=7&rm=3", "999", "Priya Kapoor"],
//   [5, "Java Programming Essentials", "Learn object-oriented programming with Java from scratch.", "https://tse1.mm.bing.net/th/id/OIP.blX7FtZYRfVrF4GWe6AihAHaEL?rs=1&pid=ImgDetMain&o=7&rm=3", "1199", "Siddharth Menon"],
//   [6, "Advanced Excel & Dashboards", "Excel techniques including pivot tables, charts, and dashboard creation.", "https://tse1.mm.bing.net/th/id/OIP.blX7FtZYRfVrF4GWe6AihAHaEL?rs=1&pid=ImgDetMain&o=7&rm=3", "799", "Megha Rathi"],
//   [7, "Machine Learning with Python", "Build ML models using Scikit-Learn, NumPy, and real-world datasets.", "https://tse1.mm.bing.net/th/id/OIP.blX7FtZYRfVrF4GWe6AihAHaEL?rs=1&pid=ImgDetMain&o=7&rm=3", "1799", "Dr. Varun Iyer"],
//   [8, "Digital Marketing Mastery", "SEO, social media marketing, Google Ads, and more in one course.", "https://tse1.mm.bing.net/th/id/OIP.blX7FtZYRfVrF4GWe6AihAHaEL?rs=1&pid=ImgDetMain&o=7&rm=3", "1599", "Sneha Kulkarni"],
//   [9, "Ethical Hacking & Cybersecurity", "Penetration testing, Kali Linux, and securing systems and networks.", "https://tse1.mm.bing.net/th/id/OIP.blX7FtZYRfVrF4GWe6AihAHaEL?rs=1&pid=ImgDetMain&o=7&rm=3", "1899", "Arjun Shetty"],
//   [10, "C++ Programming from Zero", "Basic to advanced C++ including OOP and STL for beginners.", "https://tse1.mm.bing.net/th/id/OIP.blX7FtZYRfVrF4GWe6AihAHaEL?rs=1&pid=ImgDetMain&o=7&rm=3", "899", "Nikita Joshi"],
//   [11, "Mobile App Development with Flutter", "Create cross-platform mobile apps using Flutter and Dart.", "https://tse1.mm.bing.net/th/id/OIP.blX7FtZYRfVrF4GWe6AihAHaEL?rs=1&pid=ImgDetMain&o=7&rm=3", "1599", "Kunal Deshmukh"],
//   [12, "Stock Market & Trading Basics", "Learn investing, technical analysis, and market psychology.", "https://tse1.mm.bing.net/th/id/OIP.blX7FtZYRfVrF4GWe6AihAHaEL?rs=1&pid=ImgDetMain&o=7&rm=3", "1399", "Shivam Thakur"],
//   [13, "Photography Masterclass", "Lighting, framing, editing, and building a photography brand.", "https://tse1.mm.bing.net/th/id/OIP.blX7FtZYRfVrF4GWe6AihAHaEL?rs=1&pid=ImgDetMain&o=7&rm=3", "999", "Riya Sen"],
//   [14, "English Communication Skills", "Improve your spoken English, writing, and professional communication.", "https://tse1.mm.bing.net/th/id/OIP.blX7FtZYRfVrF4GWe6AihAHaEL?rs=1&pid=ImgDetMain&o=7&rm=3", "699", "Ashutosh Jha"],
//   [15, "Entrepreneurship & Startup Basics", "Build your own startup idea with business models, MVPs, and funding tips.", "https://tse1.mm.bing.net/th/id/OIP.blX7FtZYRfVrF4GWe6AihAHaEL?rs=1&pid=ImgDetMain&o=7&rm=3", "1199", "Ishita Mehta"]
// ];

// try{
//     connection.query(q,[sampleCoursesValues],(err,result)=>{
//         if(err) throw err;
//         console.log(result);
//     });
// }catch(err){
//     console.log(err);
// }
// connection.end();


//index route

app.get("/courses",(req,res)=>{
   let q="select * from courses";
   try{
    connection.query(q,(err,courses)=>{  //result =courses
        if (err) throw err;
        console.log(courses);
        res.render("index.ejs",{courses});
    });
   }catch(err){
    console.log(err);
    res.send("err");
   }
});

// new
app.get("/courses/new",(req,res)=>{
    res.render("new.ejs");
});


// show 
app.get("/courses/:id",(req,res)=>{
    let {id}=req.params;
    let q=`select * from courses where id=${id}`
    try{
    connection.query(q,(err,course)=>{  //result =courses
        if (err) throw err;
        console.log(course)
        res.render("show.ejs",{course:course[0]}); //array first element
    });
   }catch(err){
    console.log(err);
    res.send("err");
   }
});


// create

app.post("/courses", (req, res) => {
  const { name, description, image, price, tutor } = req.body.course;
  const q = "INSERT INTO courses (name, description, image, price, tutor) VALUES (?, ?, ?, ?, ?)";
  const values = [name, description, image, price, tutor];

  connection.query(q, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Error inserting data");
    }
    res.redirect("/courses"); // or wherever you want to redirect
  });
});

//new

app.get("/courses/:id/edit", (req, res) => {
  const { id } = req.params;
  const q = `SELECT * FROM courses WHERE id = ?`;

  connection.query(q, [id], (err, results) => {
    if (err) return res.send("Error loading course");
    const course = results[0];
    res.render("edit.ejs", { course });
  });
});

//update
app.put("/courses/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, image, price, tutor } = req.body.course;
  const q = `UPDATE courses SET name=?, description=?, image=?, price=?, tutor=? WHERE id=?`;

  connection.query(q, [name, description, image, price, tutor, id], (err, result) => {
    if (err) return res.send("Update failed");
    res.redirect("/courses/" + id);
  });
});

//delete 
app.delete("/courses/:id",(req,res)=>{
    let {id}=req.params;
    let q=`delete from courses where id=${id}`;
     try{
    connection.query(q,(err,course)=>{  //result =courses
        if (err) throw err;
        console.log(course)
        res.redirect("/courses");
    });
   }catch(err){
    console.log(err);
    res.send("err");
   }
});

app.get("/about",(req,res)=>{
  res.render("about.ejs");
});



app.listen(8080,()=>{
    console.log("listing");
});