const express = require('express');
const port = 8000;
const path = require('path')
const db = require('./config/mongoose')
const app = express();
const Contact = require('./models/contact');

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))



app.use(express.urlencoded());
app.use(express.static('assests'))


var contactList =[
    {
        name:"amit",
        phone:"61651651",age:"10"
    },
    {
        name: "anil",
        phone:"6516161",
        age:"12"
    },
    {
        name:"soumya",
        phone:"51661646416",
        age:"5"
    }
]


app.get('/delete-contact/',(req,res)=>{
    console.log(req.params)
    let id= req.query.id;
    let contactIndex = Contact.findByIdAndDelete(id,(err)=>{
        if(err){console.log(err);return;}
        return res.redirect('/')
    })
    // if(contactIndex !=-1){
    //     contactList.splice(contactIndex,1)
    // }
   

})

app.post('/createContact',(req,res)=>{
    // contactList.push({
    //     name:req.body.name,
    //     phone: req.body.phone
    // })
    // return res.redirect('/')
    
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },(err,newContact)=>{
        if(err){console.log(err);return;}
        console.log('*******',newContact);
        return res.redirect('/')
    })
})
app.get('/',(req,res)=>{
    Contact.find({},function(err,contacts){
     if(err){console.log('error in fetching contact');
    return}
    return res.render('home',{
        title:"hello",
        contact:contacts})
    })
    
})
app.get('/profile',(req,res)=>{
    return res.render('profile',{
        title:"profile",
        name:"amit"
    })
})




app.listen(port,(req,res)=>{
    return console.log("server is running")
})