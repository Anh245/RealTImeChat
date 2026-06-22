import Friend from "../models/Friend.js";
import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";





export const sendFriendRequest = async(req,res) =>{
    try {
        const {to,message} = req.body;
        const from = req.user._id;
        if(from === to){
            return res
            .status(400)
            .json({message:"Không thể gửi lời mời kết bạn với chính mình"});

        }

        //Kiểm tra người dùng tồn tại hay không
        const userExists = await User.exists({_id:to});

        if(!userExists){
            return res
            .status(404)
            .json({message:"Người dùng không tồn tại"});

        }

        //kiem tra xem da co loi moi nao chua

        let userA = from.toString();
        let userB = to.toString();
        if(userA > userB){
            [userA,userB] = [userB,userA];
        }
        const [alreadyFriends, existFriends] = await Promise.all([
            Friend.findOne({userA,userB}),
            FriendRequest.findOne({
                $or:[
                    {from,to},
                    {from:to,to:from}
                ]
            })
        ]);

        if(alreadyFriends){
            return res
            .status(400)
            .json({message:"Bạn đã là bạn bè"});
        
        }
        if(existFriends){
            return res
            .status(400)
            .json({message:"Bạn đã gửi lời mời kết bạn trước đó"});
        }

        const request = await FriendRequest.create({
            from,
            to,
            message
        });

        return res.status(201).json({message:"Yêu cầu kết bạn đã được gửi",request});


    } catch (error) {
        console.log("Loi khi gui yeu cau ket ban", error);
        return res.status(500).json({message:"Lỗi hệ thống"});
    }

};

export const acceptFriendRequest = async(req,res)=>{
    try {
        const {requestId} = req.params;
        const userId = req.user._id;

        const request = await FriendRequest.findById(requestId);

        if(!request){
            return res
            .status(404)
            .json({message:"Yêu cầu kết bạn không tồn tại"});

        }
        if(request.to.toString() !== userId.toString()){
            return res
            .status(403)
            .json({message:"Bạn không có quyền chấp nhận yêu cầu này"});


        }

        const friend = await Friend.create({
            userA:request.from,
            userB:request.to
        });

        await FriendRequest.findByIdAndDelete(requestId);

        const from = await User.findById(request.from).select(
            "_id displayName avatarUrl"
        ).lean();

        return res.status(200).json({message:"Yêu cầu kết bạn đã được chấp nhận",newFriend:{
            _id: from?._id,
            displayName: from?.displayName,
            avatarUrl: from?.avatarUrl
        }});

        //const to = await User.findById(request.to);


        

    } catch (error) {
        console.log("Lỗi khi chấp nhận kết bạn", error);
        return res.status(500).json({message:"Lỗi hệ thống"});
    }
    
};
export const declineFriend = async(req,res)=>{
    try {
        const {requestId} = req.params;
        const userId = req.user._id;

        const request = await FriendRequest.findById(requestId);

        if(!request){
            return res.status(404).json({message:"Yêu cầu kết bạn không tồn tại"});
        
        }
        if(request.to.toString() !== userId.toString()){
            return res
            .status(403)
            .json({message:"Bạn không có quyền từ chối yêu cầu này"});
        }

        await FriendRequest.findByIdAndDelete(requestId);

        return res.status(204).json({message:"Yêu cầu kết bạn đã được từ chối"});

    } catch (error) {
        console.log("Lỗi khi từ chối kết bạn", error);
        return res.status(500).json({message:"Lỗi hệ thống"});
    }
    
};
export const getAllFriends = async(req,res)=>{
    try {
        const userId = req.user._id;

        const friendships = await Friend.find({
            $or:[{
                userA:userId
            },{
                userB:userId
            
            }],
        })
        .populate("userA","_id displayName avatarUrl")
        .populate("userB","_id displayName avatarUrl")
        .lean();

        if(!friendships.length){
            return res.status(200).json({message:"Bạn chưa có bạn bè"});

        }

        const friends = friendships.map((f) =>
        f.userA._id.toString() === userId.toString() ?f.userB: f.userA);

        return res.status(200).json({friends});


    } catch (error) {
        console.log("Lỗi khi lấy danh sách bạn bè", error);
        return res.status(500).json({message:"Lỗi hệ thống"});
    }
    
};
export const getAllRequests = async(req,res)=>{
    try {
        
        const userId = req.user._id;

        const populateFields = '_id username displayName avatarUrl';
        const [sent, received] = await Promise.all([
            FriendRequest.find({from:userId}.populate("to",populateFields)),
            FriendRequest.find({to:userId}.populate("from",populateFields)),
        ]);
        return res.status(200).json({sent,received});
    } catch (error) {
        console.log("Lỗi khi lấy danh sách lời mời kết bạn", error);
        return res.status(500).json({message:"Lỗi hệ thống"});
    }
    
};