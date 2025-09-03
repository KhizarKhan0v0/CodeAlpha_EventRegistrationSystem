const express = require('express')
const router = express.Router()
const {Event} = require('../Models/models')
const {Register, GetEventDetails} = require('../Controllers/event.controller')
const authenticate = require('../Middlewares/auth')




// todo: Register Events (admin only)
router.post('/register', authenticate , (req,res)=>{
    
    Register(req,res)

})

// todo : View Event list
router.get('/' , async(req,res)=>{
    const dbres=await Event.find({}, {title : 1, capacity: 1,registeredCount: 1})
    if (!dbres) {
        return res.status(404).json({message : 'No event found'})
    }
    // const dat=dbres.filter(a=> a.capacity > a.registeredCount)
    // console.log(dat)
    res.status(200).json({message : 'Ok', data:dbres})
    
})

// todo : View Event Details
router.get('/id/:id', async(req,res)=>{
    GetEventDetails(req,res)

})

router.get('/getAll', authenticate , async(req,res)=>{
    const dbres = await Event.find()
    res.status(200).json({message : 'All events fetched', data:dbres})
})





module.exports = router