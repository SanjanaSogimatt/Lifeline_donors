const express=require('express')
const app=express()
const methodOverride=require('method-override')
const path=require('path')
const mongoose=require('mongoose')
const Donor=require('./models/donor')
const bloodBank=require('./models/blood-bank')
const Request=require('./models/request')
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded({extended:true}))
mongoose.connect('mongodb://localhost:27017/webApp',{
    useNewUrlParser:true,
    //useCreateIndex:true,
    useUnifiedTopology:true
})
const db=mongoose.connection
db.on("error",console.error.bind(console,"connection error:"))
db.once("open",()=>{
    console.log("Database connected")
})
app.use(methodOverride('_method'))
app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/community',async(req,res)=>{
    const donors=await Donor.find({})
    res.render('bloodOrg/index',{donors})
})
app.get('/community/request',async(req,res)=>{
    res.render('bloodOrg/request')
})
app.post('/community/',async(req,res)=>{
    const request=new Request(req.body.request)
    const accountSid = "AC130da098efe889e15faa00c55e1adb17";
const authToken = "210736041f221abe42e4688017ce8dd4";
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: `Need a donor with ${request.blood_group} at ${request.address} contact ${request.phone}`,
     from: '+13157079598',
     to: '+919380500406'
   })
  .then(message => console.log(message.sid));
    await request.save()
    res.redirect('/community')
})

app.get('/community/new',async (req,res)=>{
    res.render('bloodOrg/new')
})
app.post('/community/',async(req,res)=>{
    const donor=new Donor(req.body.donor)
    if(donor.weight<50 || donor.age<18){
        alert('You are underage')
    }else{
    await donor.save()
    res.redirect('/community')
    }
})
app.get('/community/bloodbank',async(req,res)=>{
    const bloodbanks=await bloodBank.find({})
    res.render('bloodOrg/bloodbank',{bloodbanks})
})

app.get('/community/newBloodbank',async(req,res)=>{
    res.render('bloodOrg/newbloodbank')
})
// app.post('/community/bloodbank',async(req,res)=>{
//     const bloodbank=new bloodBank(req.body.bloodbank)
//     await bloodbank.save()
//     res.redirect('/community/bloodbank')
// })
// app.get('/community/:id/edit', async(req,res)=>{
//     const donor=await Donor.findById(req.params.id)
//     res.render('bloodOrg/edit',{donor})
// })
app.put('/community/:id',async(req,res)=>{
    const {id}=req.params
    const donor=await Donor.findByIdAndUpdate(id,{...req.body.donor})
    res.redirect(`/community`)
})
app.delete("/community/:id",async (req,res)=>{
    const {id}=req.params
    await Donor.findByIdAndDelete(id)
    res.redirect(`/community`)
})
app.listen(3000,()=>{
    console.log("Server on port 3000")
})