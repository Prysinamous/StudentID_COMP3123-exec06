//npm init
//npm install express nodemon mongoose
//npm i nodemon --save--dev
//mongodb+srv://robbi:archie12@comp3123.dnlob.mongodb.net/sample_restaurants?retryWrites=true&w=majority
//Robertha Alvarez 101236645

let express = require("express")
let mongoose = require("mongoose")
let StudentModel = require("./models/Student")

let app = express()

mongoose.connect('mongodb+srv://robbi:archie12@comp3123.dnlob.mongodb.net/db_f2021_comp3123?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

app.get("/", (req, res) => {
    res.send("<h1>MongoDB mongoose Example</h1>")
})

//adding new student
app.get("/add", async (req, res) => {

    let s =
        {
        first_name: "Robertha",
        last_name: "Alvarez",
        total: 100,
        result:"PASSED YAY"
    }

    // here we are creating a student model object
    let new_student = new StudentModel(s)

    try{
        await new_student.save(s)
        console.log("Student Record is saved")
        res.status(200).send("Student Record is saved")
    }
    catch(err)
    {
        console.log("ERROR: Student Record Saved: " + err)
        res.status(500).send(err)
    }
})

// //Read student data
app.get("/students", async (req, res) => {

    const s = await StudentModel.find( {}, "first_name total").sort({total: -1})
    //{ total:{$gt:100}
try{
        res.send(s)
    }catch(err){
        console.log("Error: "+ err)
        res.status(500).send(err)
    }
})

app.listen(8083, () => {
    console.log("Server running at http://localhost:8083/")
})



