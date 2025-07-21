const mongoose=require('mongoose');
const serviceschema=new mongoose.Schema({

name:String,
categorie:String,
location:String,
salary:Number,
description:String,
image:String,
idUser:{type: mongoose.Schema.Types.ObjectId , ref:'User'}//cle etrangére

//user admet plusieur service

})

module.exports=mongoose.model('Service',serviceschema);