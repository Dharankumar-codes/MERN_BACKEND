import mongoose from "mongoose";



const crudShema = new mongoose.Schema({
    username:String,
    useremail:{type:String,unique:true},
    userpassword:{type:String,min:8},
    status : {type:String,default:"Active"}
},{timestamps:true})


const crudModel = mongoose.model('curddatass',crudShema)

export default crudModel