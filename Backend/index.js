const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 8080

//schema
const schemaData = mongoose.Schema({
    name : String ,
    email : String,
    mobile : String
}, {
    timestamps : true
})

const usermodel = mongoose.model("user", schemaData)
//read api
app.get("/", async (req,res)=>{
    const data = await usermodel.find({})
    res.json({success : true, data : data})
 } )
 //create data 
 app.post("/create", async(req,res)=>{
    console.log(req.body);
    const data = new usermodel(req.body)
    await data.save()
    res.send({success : true, message : "data save successfully", data :data})
 })


 //update data
 
// app.put("/update", async(req, res)=>{
//    console.log(req.body);
//    const { id, ...rest} = req.body
//    console.log(rest);
   
//  const data = await usermodel.updateOne({_id:id} ,rest)
//  res.send({success : true, message : "data updated successfully", data : data})

//  })
//update
app.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params; // Extract the ID from the URL parameters
        const updateData = req.body; // Get the rest of the data from the request body

        // Perform the update operation
        const result = await usermodel.updateOne({ _id: id }, { $set: updateData });

        if (result.nModified > 0) {
            res.send({ success: true, message: "Data updated successfully", data: result });
        } else {
            res.send({ success: false, message: "No changes made or ID not found" });
        }
    } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).send({ success: false, message: "Server error" });
    }
});

 //delete data
app.delete("/delete/:id", async(req,res)=>{
   const id = req.params.id
   console.log(id);
   const data = await usermodel.deleteOne({_id : id})
   res.send({success : true, message : "data deleted successfully", data : data})
   
})



mongoose.connect("mongodb://127.0.0.1:27017/contactmanagement")

.then(()=>{
    console.log("connected to DB");
    app.listen(PORT, ()=>console.log("server is running"))
})
.catch((err) =>console.log(err))







