import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { updateConversationAfterCreateMessage } from "../Utils/messageHelper.js";


export const sendDirectMessage = async(req,res) =>{
    try {
        const {recipientId,content,conversationId} = req.body;
        const senderId = req.user._id;

        let conversation;
        if (!content){
            return res.status(400).json({message:"Thieu noi dung"});

        }
        if(!conversationId){
            conversation = await Conversation.findById(conversationId);

        }

        if(!conversation){
            conversation = await Conversation.create({
                type:"direct",
                participants:[
                    {userId:senderId,joinedAt: new Date()},
                    {userId:recipientId,joineAt: new Date()}
                ],
                lastMessageAt: new Date(),
                unreadCounts: new Mapl()
            })
        }

        const message = await Message.create({
            conversationId: conversation._id,
            senderId,
            content,
        });
        updateConversationAfterCreateMessage(conversation, message, senderId);
        await conversation.save();

        return res.status(201).json({message});

    } catch (error) {
        console.error("Loi xay ra khi gui tin nhan truc tiep", error);
        return res.status(500).json({message:"Loi he thong"});
    }
};

export const sendGroupMessage = async(req,res) =>{
    
};



