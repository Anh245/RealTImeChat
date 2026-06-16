import React from 'react'
import Logout from '@/components/auth/logout'
import { useAuthStore } from '@/stores/useAuthStore';
import { Button } from '@/components/ui/button';
import api from '@/lib/axios';
import { toast } from 'sonner';


const ChatAppPage = () => {
  const {user} = useAuthStore((s)=> s.user);
  const handleOnClick = async () => {
    try {
      await api.get("/users/test",{withCredentials: true});
      toast.success("Success");
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  }
  return (
    <div>
      {user?.username}
      <Logout/>
      <Button onClick={handleOnClick}> Test</Button>
    </div>
  )
}

export default ChatAppPage
