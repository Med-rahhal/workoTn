const express = require('express');

const {createProposal,getProposalByServiceId,getProposalByUserId,deleteProposal,acceptProposal} = require('../controllers/proposal.controller');
const router = express.Router();


router.post('/create',createProposal);
router.get('/byServiceId/:id',getProposalByServiceId);
router.get('/byUserId/:id',getProposalByUserId);
router.delete('/deletProposal/:id',deleteProposal);
router.put('/accept/:id',acceptProposal);




module.exports = router;