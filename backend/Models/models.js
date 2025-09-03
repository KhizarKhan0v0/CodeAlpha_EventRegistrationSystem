const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true } // Hash in production
});

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true, unique:true },
    description: String,
    date: { type: Date, required: true },
    location: String,
    capacity: { type: Number, default: 0 },
    registeredCount: { type: Number, default: 0 }
});

const RegistrationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    registrationDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['registered', 'canceled'], default: 'registered' }
});

const User = mongoose.model('User', UserSchema);
const Event = mongoose.model('Event', EventSchema);
const Registration = mongoose.model('Registration', RegistrationSchema);

module.exports = {User , Event , Registration}