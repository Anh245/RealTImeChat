import api from "@/lib/axios";
import type { ConversationResponse, Message } from "@/types/chat";

interface FetchMessageProps{
    messages: Message[],
    cursor?:string;

}

const pageLimit = 50;

export const chatService =  {
    async fetchConversation() : Promise<ConversationResponse> {
        const res = await api.get("/conversations");
        return res.data;
    },

    async fetchMessages(id: string, cursor?: string) : Promise<FetchMessageProps>{

        const res = await api.get(`/conversations/${id}/messages?limit=${pageLimit}&cursor=${cursor}`);

        return {messages: res.data.messages, cursor: res.data.nextCursor}

    },

    async sendDirectMessage(recipentId: string, content: string = "",imgUrl?: string, consversationId?: string){
        const res = await api.post('/messages/direct',{
            recipentId, content, imgUrl, consversationId
        })
        return res.data.message;

    },
    async sendGroupMessage(conversationId: string , content: string = "", imgUrl?: string){
        const res = await api.post('/messages/group',{
            conversationId, content, imgUrl
        })
        return res.data.message;

    }

};