// todo : submit registration form
const express = require('express')
const router=express.Router()
const Registration=require('../Models/models')
const {handleRegistration} = require('../Controllers/registration.controller')

router.post('/', (req,res)=>{
    // it gets userid, eventid
    handleRegistration(req,res)
    
    
})

module.exports = router