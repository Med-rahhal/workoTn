const mongoose=require('mongoose');
const proposalsschema=new mongoose.Schema(
    {
        price:Number, //declaration de champs sans accoladde
        days:Number,
        cover:String,
        status:{
            type:Boolean,
            default:false //si on champs default on peut utiliser accolade 
        },
        idService:{type:mongoose.Schema.Types.ObjectId , ref:'Service'} ,//cle etrangére
        //chaque serv admet plusieurs proposition
        idUser:{type:mongoose.Schema.Types.ObjectId , ref :'User'}
        //chaque user avoir plusieurs proposal
    }
)

module.exports=mongoose.model('Proposal',proposalsschema);