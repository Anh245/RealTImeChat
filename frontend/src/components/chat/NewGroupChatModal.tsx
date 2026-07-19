import { useFriendStore } from '@/stores/useFriendStore';
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { User, UserPlus } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import InviteSuggestionList from '../newGroupChat/InviteSuggestionList';
import type { Friend } from '@/types/user';
import SelectedUserList from '../createNewChat/SelectedUserList';
import { toast } from 'sonner';
import { useChatStore } from '@/stores/useChatStore';

const NewGroupChatModal = () => {
  const [groupName, setGroupName] = useState("");
  const [search,setSearch] = useState("");
  const {friends,getFriends} = useFriendStore();
  const [invitedUser, setInvitedUser] = useState<Friend[]>([]);
  const {loading, createConversation} = useChatStore();

  const handleGetFriends = async() => {
    await getFriends();
  }

  const handleSelectFriend = (friend: Friend) => {
    setInvitedUser([...invitedUser, friend]);
    setSearch("");
  }

  const handleRemoveFriend = (friend: Friend) =>{
    setInvitedUser(invitedUser.filter((u)=> u._id !== friend._id));
  }


  const handleSubmit = async(e: React.SubmitEvent) =>{
    try {
      e.preventDefault();
      if(invitedUser.length === 0) {
        toast.warning("Vui lòng chọn ít nhất một thành viên")
      }
      await createConversation(
        "group",
        groupName,
        invitedUser.map((u)=>u._id)
      );
      setSearch("");
      setInvitedUser([]);
      
    } catch (error) {
      console.error("Loi xay ra khi handleSubmit trong NewGroupChatModal",error);
    }
  }

  const filterFriends = friends.filter((friend) => friend.displayName.toLowerCase().includes(search.toLowerCase()) && !invitedUser.some((u)=>u._id === friend._id));

   return (
    <Dialog>
      <DialogTrigger asChild>
          <Button
            variant="ghost"
            onClick={handleGetFriends}
            className="flex z-10 justify-center items-center size-5 rounded-full hover:bg-sidebar-accent transition cursor-pointer"
          >
              <User className="size-4"/>
              <span className="sr-only">
                Tạo nhóm
              </span>
          </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25 border-none">
        <DialogHeader>
            <DialogTitle className="capitalize">Tạo nhóm chat mới</DialogTitle>
        </DialogHeader>
        <form className="space-y-4"
          onSubmit= {handleSubmit}>

            {/* Ten nhom */}
            <div className ="space-y-2">
                <Label
                  htmlFor ="groupName"
                  className =  "text-sm font-semibold"
                >
                  Tên nhóm

                </Label>
                <Input
                  id="groupName"
                  placeholder='Đặt tên nhóm'
                  className='glass border-border/50 focus:border-primary/50 transition-smooth'
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  required
                
                />

            </div>

            {/* Moi thanh vien */}

            <div
              className='space-y-2'
            >
              <Label
                htmlFor="invite"
                className="text-sm font-semibold"
              >
                Thêm thành viên

              </Label>
              <Input
                id="invite"
                placeholder='Tìm theo tên hiển thị...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {/* danh sach goi y */}
              {search && filterFriends.length > 0 &&(
                <InviteSuggestionList
                  filterFriends={filterFriends}
                  onSelect={handleSelectFriend}
                />
              )}
              
              {/* danh sach user */}
              <SelectedUserList
                invitedUser={invitedUser}
                onRemove={handleRemoveFriend}
              
              />



            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-chat text-white hover:opacity-90 transition-smooth"
              
              >
                {
                  loading ? (
                    <span>Đang tạo...</span>
                  ):(<>
                    <UserPlus className="size-4 mr-2"/>
                    Tạo nhóm
                  </>)
                }
              </Button>
            </DialogFooter>
          </form>
      </DialogContent>
    </Dialog>
  )
}

export default NewGroupChatModal
