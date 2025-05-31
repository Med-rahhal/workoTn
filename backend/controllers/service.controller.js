const Service =require('../models/service');

exports.createService=async (req,res)=>{

    try {
        const newService =new Service(req.body);
        await newService.save();
        res.status(201).json({message:'service created'});
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


exports.getServices=async (req,res)=>{//tt service page home

    try {
        const services =await Service.find().populate('idUser','firstname lastname image');
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


exports.getMyServices=async (req,res)=>{//service creer by chaque user connecter

    try {
        const services =await Service.find({idUser: req.params.id}).populate('idUser','firstname lastname image');
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.getServiceById = async (req, res) => {
    try {
      const { id } = req.params; 
  
     
  
      // ✅ Rechercher le service avec cet ID
      const service = await Service.findById(id).populate('idUser', 'firstname lastname image');
  
      if (!service) {
        return res.status(404).json({ message: "Service non trouvé" });
      }
  
      res.status(200).json(service);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.deleteService=async (req,res)=>{

    try {
        await Service.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'service deleted'});

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}