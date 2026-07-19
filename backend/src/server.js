import express from "express";
import  dotenv from "dotenv";
import { connectDB } from "./libs/db.js";
import conversationRoute from "./routers/conversationRoute.js";
import authRoute from "./routers/authRoute.js";
import userRoute from "./routers/userRoute.js";
import friendRoute from "./routers/friendRoute.js";
import messageRoute from "./routers/messageRoute.js";
import cookieParser from "cookie-parser";
import { protectedRoute } from "./middlewares/authMiddleware.js";
import cors from "cors";
import { app ,server } from "./socket/index.js";
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

// const app = express();

const PORT = process.env.PORT || 5001;


//middleware

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));


// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    // Click 'View API Keys' above to copy your API secret
});


// public routes
app.use("/api/auth", authRoute);



//private routes
app.use(protectedRoute);
app.use("/api/users", userRoute);

app.use("/api/friends", friendRoute);
app.use("/api/messages",messageRoute);
app.use("/api/conversations",conversationRoute);







//connect to database

connectDB().then(() => {
    
    server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });
});
