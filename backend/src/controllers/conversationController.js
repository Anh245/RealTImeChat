import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";





export const createConversation = async (req, res) => {
    try {
        const {type, name , memberIds} = req.body;
        const userId = req.user._id;

        if(!type || (type === 'group' && !name)||
        !memberIds ||
        !Array.isArray(memberIds) ||
        !memberIds.length == 0
        ){
            return res.status(400).json({message:"Ten mhom va danh sach thanh vien la bat buoc"})
        }
        let conversation;
        if(type === 'direct'){
            const participantId = memberIds[0];

            conversation = await Conversation.findOne({ type: 'direct',
                "participants.userId": {$all:[userId,participantId]},

            });
            if(!conversation){
                conversation = new Conversation({
                    type:'direct',
                    participants: [{userId},{userId:participantId}],
                    lastMessageAt: new Date(),

                });
                await conversation.save();

            }
        }

        if(type === 'group'){
            conversation = new Conversation({
                type:'group',
                participants:[
                    {userId},
                    ...memberIds.map((id)=>({userId:id}))
                ],
                group: {
                    name,
                    createdBy: userId
                },
                lastMessageAt: new Date(),

            });
            await conversation.save();
        }

        if(!conversation){
            return res.status(400).json({message:"Conversation type khong hop le"});

        }
        await conversation.populate(
            [
                {path:'participants.userId',select:'_id displayName avatarUrl'},
                {path:'group.createdBy',select:'_id displayName avatarUrl'},
                {path:'lastMessage.senderId',select:'_id displayName avatarUrl'},
            ]
        );
        return res.status(201).json({conversation});
    }
    catch (error) {
        console.error("Loi khi tao conversation", error);
        return res.status(500).json({message:"Loi he thong"});
    }
};
export const getConversations = async (req, res) =>{
    try {
        const userId = req.user._id;
        const conversations = await Conversation.find({
            'participants.userId': userId,

        }).sort({lastMessageAt:-1, updateAt: -1})
        .populate({
            path:'participants.userId',
            select:'_id displayName avatarUrl',

        })
        .populate({
            path:'lastMessage.senderId',
            select:'_id displayName avatarUrl',

        })
        .populate({
            path:"seenBy",
            select:"displayName avatarUrl",
        });

        const formatted = conversations.map((convo)=>{
            const participants = (convo.participants || [].map((p)=>({
                _id:p.updateAt?._id,
                displayName:p.userId?.displayName,
                avatarUrl:p.userId?.avatarUrl,
                joinedAt:p.joinedAt,
            })));
            return{
                ...convo.toObject(),
                unreadCount: convo.unreadCounts || {},
                participants,
                l
            };
        });
        return res.status(200).json({conversations:formatted});

    } catch (error) {
        console.error("Loi khi lay danh sach conversation", error);
        return res.status(500).json({message:"Loi he thong"});
    }
};
export const getMessages = async (req, res) => {
}
