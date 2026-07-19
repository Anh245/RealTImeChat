import { useFriendStore } from '@/stores/useFriendStore'
import React from 'react'
import FriendRequestItem from './FriendRequestItem';

const SentRequests = () => {
    const {sentList} = useFriendStore();

    if(!sentList || sentList.length === 0 ) {
        <p className="text-sm text-muted-foreground"
        >Bạn Chưa gửi lời mời kết bạn nào</p>
    }
  return (
    <div className='space-y-2 mt-4'>
      <>{sentList.map((req) => (<FriendRequestItem key= {req.id} requestInfo={req} type="sent" actions={<p className="text-muted-foreground text-sm">Đang chờ trả lời...</p>}/>))}</>
    </div>
  )
}

export default SentRequests
