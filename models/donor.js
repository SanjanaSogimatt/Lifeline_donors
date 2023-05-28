const mongoose=require('mongoose')
const Schema=mongoose.Schema
const donorSchema=new Schema({
    name:String,
    age:Number,
    weight:Number,
    dob:String,
    gender:String,
    blood_group:String,
    email:String,
    phone:String,
    address:String,
    city:String
})
module.exports=mongoose.model('Donor',donorSchema)