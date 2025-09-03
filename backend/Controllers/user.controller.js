const {User, Event} = require('../Models/models')
const {generateToken} = require('../service/auth')


async function registerUser(req,res){
    const {username, password, email} = req.body
    try {
        const dbres=await User.create({username, password, email})
        console.log('--------user created')
        res.status(201).json({message : 'User Created', data:dbres})
        // res.render('login')
    } catch (error) {
        if (error.code === 11000) {
            console.error(error);
            return res.status(409
            ).json({message : 'user already exists', error})
        }
        console.log(error);
        res.status(500).json({message:"internal server error", error})
    }
}

async function handleLogin(req,res) {
    const {email, password} = req.body
    
    const user = await User.findOne({email, password})
    if (!user) {
        return res.status(404).json({message:"Invalid Email or Password"})
    }
    const token=generateToken(user)
    res.cookie("uid", token, {
        httpOnly: true,
        secure: false,      // ✅ false in local dev (because http://)
        sameSite: "lax"     // ✅ works for same localhost cross-port
    });
    console.log(token)
    res.status(200).json({message:'user logined', user})
    // const events = await Event.find()
    // res.render('home', {user, events})
    

}

module.exports = {registerUser, handleLogin}