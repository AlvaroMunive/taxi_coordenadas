const {Router }= require("express")
const router= Router();
const client= require('./../database');
const path=require('path')

//routes

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"../view/index.html"))
    })

router.get('/ubicar',(req,res)=>{
    res.sendFile(path.join(__dirname,"../view/ubicar.html"))
    })  

module.exports=router