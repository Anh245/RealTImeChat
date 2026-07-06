import type { Participant } from '@/types/chat'
import { Avatar } from 'radix-ui';
// import React from 'react'
import UserAvatar from './UserAvatar';
import { Eclipse, Ellipsis } from 'lucide-react';


interface GroupChatAvatarProps {
    participants: Participant[];
    type: "chat" | "sidebar"
}
const GroupChatAvatar = ({participants, type} : GroupChatAvatarProps) => {
    const avatars = [];
    const limit = Math.min(participants.length, 4);

    for(let i = 0; i < limit; i++){
        const member = participants[i];
        avatar.push(
            <UserAvatar
                key={i}
                type = {type}
                name = {member.displayName}
                avatarUrl = {member.avatarUrl ?? undefined}
            />
        )

    }

  
  
    return (
    <div className='relative flex -space-x-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:ring-2'>
      {avatars}
      {participants.length > limit && (
         
        <div className='flex items-center z-10 justify-center size-8 rounsed-full 
        bg-muted ring-2 ring-background text-muted-foreground'>
            <Ellipsis className='size-4'/>
        </div>
      
      )}
      {/* neu nhieu hon 4 avatar thi render dau ... */}
     
    </div>
  )
}

export default GroupChatAvatar
