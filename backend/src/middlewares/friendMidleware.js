import Conversation from "../models/Conversation";
import Friend from "../models/Friend";

const pair = (a,b ) => ( a< b ? [a,b]: [b,a]);
export const checkFriendship = async (req,res, next) =>{
    try {
        const me = req.user._id.toString();


        const recipientId = req.body?.recipientId ?? null;
        const memberIds = req.body?.memberIds?? [];

        if(! recipientId && !memberIds.length === 0){
            return res.status(400).json({message:"Thieu recipientId hoac memberIds"});

        }

        if(! recipientId){
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

        

        
        
    } catch (error) {
        console.error("Loi khi kiem tra ket ban", error);
        return res.status(500).json({message:"Loi he thong"});
    }
};