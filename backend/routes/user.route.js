const express =require('express');
const {register,login,getUserById,editUser}=require('../controllers/user.controller');
const router=express.Router();

const multer=require('multer');
const myStorage=multer.diskStorage({

    destination : './public',
    filename:(req,file,cb)=>{
        let fileName=Date.now() + '.' + file.mimetype.split('/')[1];
        req.body.image = fileName;
       cb(null, fileName);
    }


})
 
const upload =multer ({storage:myStorage});


router.post('/register',register);
router.post('/login',login);
router.get('/getUsrbyId/:id',getUserById);
router.put('/updateUser/:id',upload.single('image'),editUser);





module.exports=router;