const express = require('express')
const router=express.Router()
const {registerUser, handleLogin} = require('../Controllers/user.controller')


router.post('/register', (req,res)=>{
    const {username, email, password} = req.body;
    if (username.length === 0 || email.length ===0 || password.length ===0) {
        return res.status(404).json({ message : 'Data is incomplete'})
    }

    registerUser(req,res)

})


// todo : User Login API 
router.post('/login', (req,res)=>{
    handleLogin(req,res)
})

module.exports = router