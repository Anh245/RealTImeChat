import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const socketAuthMiddleware = async(socket, next) =>{
    try {
        const token = socket.handshake.auth?.token;
        if(!token){
            return next(new Error("khong tim thay token"));

        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if(!decoded){
            return next(new Error("Unauthorized - Token khong hop le hoac da het han"));


        }

        const user = await User.findById(decoded.userId).select("-hashPassword");

        if(!user) {
            return next(new Error("Unauthorized - Nguoi dung khong ton tai"));

        
        
        }

        socket.user = user;

        next();

    } catch (error) {
        console.error("Loi khi xac thuc nguoi dung:", error);
        return next(new Error("Unauthorized - Loi he thong"));
    }
}