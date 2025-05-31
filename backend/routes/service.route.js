const express=require('express');
const {createService ,getMyServices,getServiceById,getServices,deleteService} = require('../controllers/service.controller');
const router = express.Router();

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

router.post('/create',upload.single('image'),createService);
router.get('/getAllServ',getServices);
router.get('/getById/:id',getServiceById);
router.get('/getMyserv/:id',getMyServices);
router.delete('/deleteServ/:id',deleteService);







module.exports = router;