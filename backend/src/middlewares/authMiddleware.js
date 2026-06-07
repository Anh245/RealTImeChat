import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectedRoute = async(req, res, next) => {
    try {
        // lay token tu header

        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if(!token){
            return res.status(401).json({message:"khong tim thay acces token"});

        }

        // xac thuc token

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async(err, decodedUser) => {
            if(err){
                console.error("Loi xac thuc token:", err);
                return res.status(403).json({ message: "Token khong hop le hoac het han" });
            }
            const user = await User.findById(decodedUser.userId).select("-hashPassword");

            if(!user){
                return res.status(404).json({ message: "Nguoi dung khong ton tai" });
            }
            req.user = user;
            next();
        });
        
    } catch (error) {
        console.error("Loi khi xac thuc nguoi dung:", error);
        return res.status(500).json({ message: "Loi he thong" });
    }

}