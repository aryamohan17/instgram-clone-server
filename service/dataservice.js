// import database file 
const db = require('./db.js')

// import jwttocken
const jwts = require('jsonwebtoken')

// for register

register = (email_ph, fullname, user_name, password,image_file) => {
    return db.User.findOne({ email_phone: email_ph }).then(user => {
        if (user) {
            currentFullname=user.fullName
            currentUserName=user.username
         

            return {
                status: false,
                message: "User already present,Use another mail id",
                statusCode: 402
            }
        } else {
            const newUser = new db.User({
                email_phone:email_ph,
                fullName:fullname,
                username:user_name,
                password:password,
                profile_photo:image_file

            })
            newUser.save();
            return {
                status: true,
                message: "User sucessfully register",
                statusCode: 200
            }
        }
    })
}

// for login

login=(emails,pass)=>{
    return db.User.findOne({email_phone:emails,password:pass}).then(user=>{
        if(user){
             currentId=user._id,
            currentFullname=user.fullName,
            currentUserName = user.username,
            currentProfilePic = user.profile_photo
            currentEmail = user.email_phone
            currentPostPic = user.post_pic
            currentUserLike=user.like
            currentFollower=user.followers
            currentFollowing=user.following

            const tockens = jwts.sign({currentEmail},"secret_key")

            return{
                status:true,
                message:"Login sucessfully",
                statusCode:200,
                currentId,
                currentFullname,
                currentUserName,
                currentProfilePic,
                currentPostPic,
                currentUserLike,
                currentFollower,
                currentFollowing,
                tockens
            }
        }
        else{
            return{
                status:false,
                message:"Email id or password incorrect",
                statusCode:401
            }    
        }
    })
}

// upload_profile_pic
// upload_profile_pic=(password,img_file)=>{
//    return db.User.findOne({password}).then(user=>{
//     if(user){
//         user.profile_photo=img_file
//         user.save();
//         return {
//             status:true,
//               message:"photo sucessfully added",
//               statusCode:200,
              
//           }
//     }
//     else{
//         return{
//             status:false,
//             message:"Photo not add",
//             statusCode:401
//         } 
//     }
//    })
// }

// upload post images
// upload_post_image=(username,imgFile)=>{
//     return db.User.findOne({username}).then(user=>{
//         if(user){
//             user.post_pic+=imgFile
//             user.save();
//             return{
//                 status:true,
//                 message:"photo added sucessfully",
//                 statusCode:200
//             }
//         }
//     })
// }

viewAll=()=>{
    return db.User.find().then(user=>{
        if(user){
            return{
                status:true,
                statusCode:200,
                allPosts:user
                // allUsername:username
                // allUserProfile:user.profile_photo
            }
        }
        else{
            return{
                status:false,
                statusCode:400,
                message:"error occur"
            }
        }
    })
}
viewUser=(username)=>{
    return db.User.findOne({username}).then(user=>{
        if(user){
            return{
                status:true,
                statusCode:200,
                userData:user
            }
        }
        else{
            return{
                status:false,
                statusCode:401,
                message:"Invalid"
            }    
        }
    })
}

searchUser=(username)=>{
    return db.User.findOne({username}).then(user=>{
        if(user){
            return{
                status:true,
                statusCode:200,
                currentUserData:user
            }
        }
        else{
            return{
                status:false,
                statusCode:401,
                message:"invalid"
            }    
        }
    })
}
deleteAccount=(username)=>{
    return db.User.deleteOne({username}).then(user=>{
      if(user){
        return{
          status : true,
          statusCode:200,
          message:'account deleted'
        }
      }
      else{
        return{
          status:false,
          message:"user not exist",
          statusCode:401
        }
      }
    })
  }
  updateUser=(email_phone,fullName,username,password,profile_photo)=>{
    return db.User.findOne({username}).then(user=>{
        if(user){
            user.email_phone=email_phone
            user.fullName=fullName
            // user.username=username
            user.password=password
            user.profile_photo=profile_photo
            user.save();
            return{
                status:true,
                statusCode:200,
                updateData:user,
                message:"profile updated"

            }
        }
            else{
                return{
                    status:false,
                    statusCode:400,
                    message:"error"
                }

            }
        })
    }
  
module.exports={
    register,login,viewAll,viewUser,searchUser,deleteAccount,updateUser
}