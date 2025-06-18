const express = require('express');
const router=express.Router();
const{getUsers,
  createUser,
  updateUser,
  deleteUser,}=require("../controllers/usercontroller.js"); 


router.get('/', getUsers);             
router.post('/createUser', createUser);          
router.put('/:id/updateUser', updateUser);        
router.delete('/:id/deleteUser', deleteUser);     

module.exports = router;
