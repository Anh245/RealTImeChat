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
    } catch (error) {
        
    }
};

export const sendGrouptMessage = async(req,res) =>{}



