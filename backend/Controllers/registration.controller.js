const {User,Event,Registration}=require('../Models/models')
async function handleRegistration(req,res) {
    const {userId, eventId} = req.body

    // checks if event exists or not
    const event =await Event.findById(eventId)
    if (!event) {
        return res.status(404).json({message : 'Event not found'})
    }

    // checks if user is already registered to the event or not
    const user =await User.findById(userId)
    const existReg=await Registration.findOne({ userId, eventId, status: 'registered'})
    if (existReg) {
        return res.status(400).json({message : 'User already registered for this event'})
    }

    // check if event capacity is full
    if(event.registeredCount >= event.capacity){
        return res.status(400).json({message : 'Registration is full'})
    }

    // Create Registration
    try {
        const dbres = await Registration.create({eventId, userId})
        event.registeredCount +=1
        await event.save()
        res.status(200).json({message : 'Registered', data: dbres})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'internal server error'})
    }
    

}



module.exports = {handleRegistration}