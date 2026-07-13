import { useChatStore } from '@/stores/useChatStore';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import ChatWelcomeScreen from './ChatWelcomeScreen';
import MessageItem from './MessageItem';
import InfinitScroll from 'react-infinite-scroll-component';
import { Container } from 'lucide-react';

const ChatWindowBody = () => {
  const {activeConversationId, conversations, messages: allMessages,fetchMessages} = useChatStore();
  const [lastMessageStatus,setLastMessageStatus] = useState<"delivered" |"seen">();
  const key = `chat-scroll-${activeConversationId}`;


  const messages = allMessages[activeConversationId!]?.items ?? [];
  const reveredMessages = [...messages].reverse();
  const selectedConvo = conversations.find((c) => c._id === activeConversationId);
  const hasMore = allMessages[activeConversationId!]?.hasMore ?? false;

  //ref
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() =>{
    const lastMessage = selectedConvo?.lastMessage;
    if(!lastMessage){
      return;
    }

    const seenBy = selectedConvo?.seenBy ?? [];

    setLastMessageStatus(seenBy.length > 0 ? "seen": "delivered");


  },[selectedConvo]);

  //Keo xuong duoi load convo
  useLayoutEffect(()=>{
    if(!messagesEndRef.current){
      return;
    }

    messagesEndRef.current.scrollIntoView({
      behavior:"smooth",
      block:"end"
    })
  },[activeConversationId]);
  
  const fetchMoreMessages = async() => {
    if(!activeConversationId){
      return;
    }

    try {
      await fetchMessages(activeConversationId);
    } catch (error) {
      console.error("Loi xay ra khi fetch them tin nhan", error);
    }
  };

  const handleScrollSave = () => {
    const container = containerRef.current;
    if(!container || !activeConversationId){
      return;
    }

    
    sessionStorage.setItem(key,JSON.stringify({
      scrollTop: container.scrollTop,
      scrollHeight: container.scrollHeight,
    }) )
  };
  
  useLayoutEffect(() => {
    const container = containerRef.current;
    if(!container ) return;
    
    const item = sessionStorage.getItem(key);
    if(item) {
      const {srollTop} = JSON.parse(item);
      // container.scrollTop = srollTop;
      // trinh duyet tinh toan xong layout moi goi ham call back
      requestAnimationFrame(() =>{
        container.scrollTop = srollTop;
      })
    }
  },[messages.length]);
  
  if(!selectedConvo) {
    return (
      <ChatWelcomeScreen/>
    );
  }

  if(!messages?.length){
    return (
      <div className='flex h-full items-center justify-center text-muted-foreground'>
          Chưa có tin nhắn nào trong cuộc trò chuyện này.
      </div>
    );
  }
  return (
    <div className='p-4 bg-primary-foreground h-full flex flex-col overflow-hidden'>
      <div
      id = "scrollable-div"
      ref = {containerRef}
      className='flex flex-col-reverse overflow-y-auto overflow-x-hidden beautiful-srollbar'>
        <InfinitScroll
          dataLength={messages.length}
          next = {fetchMoreMessages}
          hasMore = {hasMore}
          scrollableTarget="scrollable-div"
          loader={<p>Dang tai.....</p>}
          inverse= {true}
          style = {{
            display: "flex",
            flexDirection:"column-reverse",
            overflow: "visible"
          }}
          onScroll={handleScrollSave}
        >
          <div ref={messagesEndRef}></div>
          {
          reveredMessages.map((message,index) =>(
            <>
              {message.content}
              <MessageItem
                key = {message._id ?? index}
                message = {message}
                index = {index}
                messages = {reveredMessages}
                selectedConvo = {selectedConvo}
                lastMessageStatus={lastMessageStatus}
              />
            </>
          ))
        }
        </InfinitScroll>
       
        
      </div>
      
    </div>
  )
}

export default ChatWindowBody
