import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
import Session from "../models/Session.js";
dotenv.config();

const ACCESS_TOKEN_TTL = "15m";
const REFRESH_TOKEN_TTL = 14 * 24 * 60 *  1000; // 14 days in seconds
export const signUp = async(req, res) => {
    try {
        const{ username, email, password, firstname,lastname } = req.body;

        if(!username || !email || !password || !firstname || !lastname){
            return res.status(400).json({ message: "All fields are required" });
        }
        // Check if user already exists
        const duplicate = await User.findOne({username});

        if(duplicate){
            return res.status(409).json({ message: "Username already exists" });
        }
        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);


        // Create new user
        await User.create({
            username,
            hashPassword,
            email,
           displayName: `${firstname} ${lastname}`,
        });
        
        
        //return success response
        return res.status(204);
    } catch (error) {
        console.error("Error occurred while signing up:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const signIn = async(req, res) => {
    try {

        const {username , password} = req.body;

        if(!username || !password){
            return res.status(400).json({ message: "Username va password thieu" });
        }

        const user = await User.findOne({username});

        if(!user){
            return res.status(401).json({ message: "User or password incorrect" });
        }
        const passwordCorrect = await bcrypt.compare(password,user.hashPassword);

        if(!passwordCorrect){
            return res.status(401).json({ message: "User or password incorrect" });
        }

        const accessToken = jwt.sign({
            userId: user._id
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_TTL});

        const refreshToken = crypto.randomBytes(64).toString("hex");

            // Lưu refresh token vào database hoặc cache (ví dụ: Redis) với TTL

         await Session.create({
            userId: user._id,
            refreshToken,
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
         });
         
         
         // Trả về access token và refresh token cho client
         res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: REFRESH_TOKEN_TTL,
         });
         return res.status(200).json({ message: "Sign in successful", accessToken });
        
    } catch (error) {
        console.error("Error occurred while signing in:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const signOut = async(req, res) => {
    try {
        // lay refresh token trong cookie
        const token = req.cookies?.refreshToken;

        if(token){
            await Session.deleteOne({refreshToken: token});

            res.clearCookie("refreshToken");

        }
        return res.status(204);
        //Xoa refresh token khỏi session


        // Xoa cookie cookie
    } catch (error) {
        console.error("Error occurred while signing out:", error);
        return res.status(500).json({ message: "Loi trong qua trinh dang xuat" });
    }

};
export const refreshToken = async(req, res) => {
        try {
            // lay refresh token
            const token = req.cookies?.refreshToken;
            if(!token){
                return res.status(401).jsom({message:"Token khong ton tai !"});

            }
            //so sanh voi refresh token trong db
            const session = await Session.findOne({refreshToken: token});

            // kiem tra het han chua
            if(!session)
                return res.status(403).json({message:"Refresh token khong hop le"});

            // tao accessToken moi
            const accessToken = jwt.sign({
                userId: session.userId

            }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_TTL});

            return res.status(200).json({accessToken});
            

        } catch (error) {
           console.error("Loi khi goi refresh token", error);
           return res.status(500).json({message:"Loi he thong"})
        }
};

   