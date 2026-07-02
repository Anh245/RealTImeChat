import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useAuthStore } from '@/stores/useAuthStore'
import { cn } from '@/lib/utils'

interface IUserAvatarProps {
    type:"sidebar" | "chat" | "profile";
    name:string;
    avatarUrl?: string;
    className?:string;
}
const UserAvatar = ({ type, name, avatarUrl, className }: IUserAvatarProps) => {
  
        const bgColor = !avatarUrl ? "bg-blue-500" :"";

        if(!name) {
            name = "Moji";

        }

    return (
        <Avatar
            className={cn(className ??"",
                type === "sidebar" && "size-12 text-base",
                type === "chat" && "size-8 text-sm",
                type === "profile" && "size-24 text-3xl shadow-md"
            )}
        >
            
        </Avatar>
  )
}

export default UserAvatar
