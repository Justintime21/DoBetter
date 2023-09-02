const express= require('express');
const path=require('path');
const fs=require('fs');
const app=express();
const port=8000;
const mongoose =require('mongoose');

main().catch(err => console.log(err));
async function main() {
     await mongoose.connect('mongodb://127.0.0.1:27017/dobetter');
}

const contactSchema= new mongoose.Schema({
     name:String,
     email:String,
     age:String,
     message:String

});

const contact=mongoose.model('contact',contactSchema);

const volSchema= new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
    gender:String,
    address:String,
    reason:String

});

const volunteer=mongoose.model('volunteer',volSchema);


app.use('/static',express.static('static'));
app.use(express.urlencoded());

app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    const params={};
    res.status(200).render('home.pug',params);

})
app.get('/contact',(req,res)=>{
    const params={};
    res.status(200).render('contact.pug',params);

})
app.get('/aboutus',(req,res)=>{
    const params={};
    res.status(200).render('aboutus.pug',params);

})
app.post('/contact',(req,res)=>{
    var condata=new contact(req.body);
    condata.save().then(()=>{
        res.send(' your message has been saved to the database');
    }).catch(()=>{
        res.status(400).send(' there was an error');
    });
});
app.post('/vol',(req,res)=>{
    var voldata=new volunteer(req.body);
    voldata.save().then(()=>{
        res.send(' your message has been saved to the database');
    }).catch(()=>{
        res.status(400).send(' there was an error');
    });
});


app.listen(port,()=>{
    console.log(`the application is running on ${port}`)
});