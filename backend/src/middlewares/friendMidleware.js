import Conversation from "../models/Conversation.js";
import Friend from "../models/Friend.js";

const pair = (a,b ) => ( a< b ? [a,b]: [b,a]);
export const checkFriendship = async (req,res, next) =>{
    try {
        const me = req.user._id.toString();


        const recipientId = req.body?.recipientId ?? null;
        const memberIds = req.body?.memberIds?? [];

        if(! recipientId && !memberIds.length === 0){
            return res.status(400).json({message:"Thieu recipientId hoac memberIds"});

        }

        if(!recipientId){
            return res.status(400).json({message:"Thieu recipientId"});
            
        }

        if(recipientId){
            const [userA, userB] = pair(me , recipientId);
            const isFriend = await Friend.findOne({userA, userB});
            if(!isFriend){
            return res.status(403).json({message:"Ban chua ket ban voi nguoi nay"})
        }

        return next();

        }

        //todo: Chat Nhom

        const friendChecks = memberIds.map(async( memberId)=>{
            const [userA,userB] = pair(me, memberId);
            const friend = await Friend.findOne({userA,userB});
            return friend ? null : memberId;

        });
        const results = await Promise.all(friendChecks);
        const notFriends = results.filter(Boolean);
        if(notFriends.length > 0){
            return res.status(403).json({message:"Ban chi co the them ban be vao nhom"}, notFriends);

        }
        next();
        

        
        
    } catch (error) {
        console.error("Loi khi kiem tra ket ban", error);
        return res.status(500).json({message:"Loi he thong"});
    }
};

export const checkGroupMembership = async(req,res,next)=>{
    try {
        const {conversationId} = req.body;
        const userId = req.user._id;

        const conversation = await Conversation.findById(conversationId);

        if(!conversation){
            return res.status(404).json({message:"Khong tim thay cuoc tro chuyen"});



        }
        // kiem tra nguoi gui co phai thanh vien nhom khong
        const isMember = conversation.participants.some(
            (p) => p.userId.toString() === userId.toString()
        );
        
        if(!isMember){
            return res.status(403).json({message:"Ban khong phai thanh vien nhom nay"});

        }
        req.conversation = conversation;
        next();

    } catch (error) {
        console.error("Loi checkgroupMemberShip", error);
        return res.status(500).json({message:"Loi he thong"});
    }

}