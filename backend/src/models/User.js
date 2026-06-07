import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    hashPassword:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    displayName:{
        type:String,
        required:true,
        trim:true,
    },
    avatarUrl:{
        type:String, // Luu SDN cua avatar tren cloudinary
        
    },
    avatarId:{
        type:String, // Luu public_id cua avatar tren cloudinary de xoa khi doi avatar moi
    
    },
    bio:{
        type:String,
        maxlength:500,
    },
    phone:{
        type:String,
        sparse:true, // Cho phép trống và không bắt buộc nhung vẫn đảm bảo duy nhất nếu có giá trị
    }
},{
    timestamps:true, // Tự động thêm createdAt và updatedAt


});

const User = mongoose.model("User", userSchema);

export default User;

    