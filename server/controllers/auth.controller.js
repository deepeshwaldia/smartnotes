import UserModel from "../models/user.model.js"
import { getToken } from "../utils/token.js"


export const googleAuth = async (req,res) => {
    try {
        console.log("Auth Request:", req.body);
        const {name , email} = req.body
        
        if (!email) {
            return res.status(400).json({message: "Email is required"})
        }
        
        let user = await UserModel.findOne({email})
        if(!user){
            user = await UserModel.create({
                name , email
            })
            console.log("New user created:", user);
        } else {
            console.log("User found:", user);
        }
        
        let token = await getToken(user._id)
        res.cookie("token" , token , {
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge:7 * 24 * 60 * 60 * 1000
        })
        console.log("Token set successfully");
        return res.status(200).json(user)
    } catch (error) {
        console.error("Auth Error:", error);
        return res.status(500).json({message:`googleSignup Error: ${error.message}`})
    }
}

export const logOut = async (req,res) => {
    try {
        await res.clearCookie("token")
         return res.status(200).json({message:"LogOut Successfully"})
    } catch (error) {
        return res.status(500).json({message:`Logout Error  ${error}`})
    }
}