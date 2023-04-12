// import mongoose file
const mongoose = require('mongoose')

//connect to database 
mongoose.connect('mongodb://127.0.0.1:27017/instagramCloneServer', { useNewUrlParser: true })

// model creation
const User = mongoose.model('User', {
    email_phone: String,
    fullName: String,
    username: String,
    password: String,
    profile_photo:String,
    post_pic:String,
    like:String,
    followers:String,
    following:String
})
// export class
module.exports={
    User
}


