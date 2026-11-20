import crudModel from "../model/crudModel.js";

export const addDatas = async(req,res) => {


    try {
        // console.log(req.body);

        const {username,useremail,userpassword} = req.body

        if(!username||!useremail||!userpassword){
            res.status(400).json({msg:"Please fill the form"})
            return
        }


        if(userpassword.length < 8){
            res.status(400).json({msg:"Password Must be Min 8"})
            return
        }


        const findEmail = await crudModel.findOne({useremail}) 


        console.log(findEmail);

        if(findEmail){
            res.status(400).json({msg:"Already register Tyr Login"})
            return
        }

        const add = await crudModel.create({username,useremail,userpassword})

        res.status(201).json({msg:"Successfully register"})
        
        
    } catch (error) {

        console.log('error',error);
        
        
    }
    
}


export const fetchDatas = async (req,res)=>{


    try{

        const getDatas = await crudModel.find()

        if(!getDatas){
            res.status(500).json({msg:"Something error with fetch"})
            return
        }

        res.status(200).json({getDatas})

    }catch(e){

        console.log('error',error);

    }

}



export const updateDatas = async(req,res)=>{
    

  try {

    const {userid} = req.params
    const {username,useremail,userpassword} = req.body

    const updateData = await crudModel.findByIdAndUpdate(userid,{username,useremail,userpassword},{returnDocument:true,runValidators:true})
    
     res.status(200).json({msg:"Successfully Updated"})


  } catch (error) {
      console.log('error',error.message);
      res.status(500).json({msg:"Duplicate Email While Your update"})
  }

}



export const deleteDatas = async(req,res)=>{
    

  try {

    const {userid} = req.params
    

    const deleteDatasnew = await crudModel.findByIdAndDelete(userid)
    
     res.status(200).json({msg:"Successfully Deleted"})


  } catch (error) {
      console.log('error',error.message);
      res.status(500).json({msg:"Something error"})
  }

}