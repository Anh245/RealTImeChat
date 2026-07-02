import type { Conversation } from '@/types/chat'
import React from 'react'
import ChatCard from './ChatCard'
import { useChatStore } from '@/stores/useChatStore';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/useAuthStore';

const DirectMessageCard = ({convo} :{convo:Conversation}) => {
    const {user} = useAuthStore();
    const {activeConversationId, setActiveConversation,messages} = useChatStore();
    
    if(!user) return null;

    //Tim nguoi dung trong cuoc tro chuyen(Loc paticipent co id khac voi id cua user hien tai)

    const otherUser = convo.participants.find((p) => p._id !== user._id);
    if(!otherUser) return null;

    const unreadCount = convo.unreadCounts[user._id];
    const lasteMessage = convo.lastMessage?.content ?? "";

    const handleSelectConversation = async (id:string) =>{
        setActiveConversation(id);
        if(!messages[id]){
            //fetch messages
        }

    }
    return (
    <ChatCard
    convoId={convo._id}
    name = {otherUser.displayName ?? ""}
    timestamp={
        convo.lastMessage?.createdAt ? new Date(convo.lastMessage.createdAt) : undefined
    }
    isActive = {activeConversationId === convo._id}
    unreadCount = {unreadCount}
    leftSection ={
        <>
            {/* TO DO : USER AVATAR */}
            {/* TODO: STATUS BADGE */}
            {/* TODO: UNREAD COUNT */}
        </>
    }
    onSelect = {handleSelectConversation}
    subtitle = {
        <p className = {cn("text-sm truncate", unreadCount > 0 ? "font-medium text-foreground":"text-muted-foreground")}>
            {lasteMessage}
        </p>
    }
        />
  )
}

export default DirectMessageCard
