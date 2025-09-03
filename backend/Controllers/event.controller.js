const { Event } = require("../Models/models")

async function Register(req,res) {
    const eventData = req.body;
    if (!eventData.title || eventData.title.length === 0) {
        return res.status(400).json({
            message : 'Please Enter title',
            err : 'Bad Request'
        })
    }

    try {
        const dbres = await Event.create(eventData)
        res.status(201).json({
            message : 'Event Created',
            data : dbres
        })


    } catch (error) {
        if (error.code == 11000) {
            return res.status(409).json({message : 'Event Already Registered', error})
        }

        res.status(500).json({message : 'Internal Server Error', error})
    }
}


async function GetEventDetails(req,res) {
    const mongoose = require('mongoose')
    const id=req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({message : 'Invalid Event ID format'})
    }

    try {
        const dbres = await Event.findById(id)
        if (!dbres) {
            return res.status(404).json({message : 'Event Not Found',data:dbres})
        }

        res.status(200).json({message : 'event details retrieved', data:dbres})

    } catch (error) {
        console.log(error)
        res.status(500).json({message : 'Internal Server Error'})
    }

}

module.exports = {Register,GetEventDetails}