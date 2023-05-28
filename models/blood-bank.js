const mongoose=require('mongoose')
const Schema=mongoose.Schema
const bloodBankSchema=new Schema({
    name:String,
    address:String,
    email:String,
    phone:String,
})
module.exports=mongoose.model("bloodbank",bloodBankSchema)