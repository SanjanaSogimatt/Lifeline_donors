const mongoose=require('mongoose')
const Schema=mongoose.Schema
const requestSchema=new Schema({
    name:String,
    blood_group:String,
    email:String,
    phone:String,
    address:String,
    city:String
})
module.exports=mongoose.model('Request',requestSchema)