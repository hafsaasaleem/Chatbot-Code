const express = require("express");  // module add
const app = express();               // Object create for express

app.use(express.json());
// Get is used for fetching the data
app.get("/",function(req,res){       // ES5
    res.send("Hello From the Basic Function")
});

var students = [
      {id: 1, name: 'Hafsa'},
      {id: 2, name: 'Umar'},
      {id: 3, name: 'Usman'}
];

app.get("/students",(req,res)=>{ // ES6
    console.log("Student list fetch")
    res.send(JSON.stringify(students));
})

app.post("/student",(req,res)=>{
    var student = {
        id: students.length + 1,
        name: req.body.name
    }
    students.push(student)
    // console.log("The current student are "+students.length)
    console.log(`The current student are ${students.length}`)
    res.send("The student is added");
})

// Update
app.put("/student/:id",(req,res)=>{
    var student = students.find(s => s.id === parseInt(req.params.id))
    student.name = req.body.name
    res.send("Record is update")

    // console.log(req.params.id)
    // res.send("Okay ID is received")
})

// Delete 
app.delete("/student/:id",(req,res)=>{
    var student = students.find(s => s.id === parseInt(req.params.id))
    var index = students.indexOf(student);
    students.splice(index,1) 
    res.send("Record is Deleted")
})

app.listen(8080,()=>{
    console.log("The Server ia Up on Port 8080")
})