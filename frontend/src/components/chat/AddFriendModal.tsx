import React, { useState } from 'react'
import { Dialog, DialogTrigger,DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { UserPlus } from 'lucide-react';

export interface IFormValue{

}
const AddFriendModal = () => {
  const [isFound, setIsFound] =  useState<boolean | null>(null);

    return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-center items-center size-5 rounded-full hover:bg-sidebar-accent cursor-pointer z-10">
            <UserPlus className="size-4"/>
            <span className ="sr-only"> Kết bạn</span>
        </div>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[425px] border-none'>
          <DialogHeader>
              <DialogTitle>Kết bạn</DialogTitle>
          </DialogHeader>

          {!isFound &&<>
              //todo: from search by username
          </>}

          {isFound && <>
            //todo: form srearch friend
          
          </>}
      </DialogContent>
    </Dialog>
  )
}

export default AddFriendModal
