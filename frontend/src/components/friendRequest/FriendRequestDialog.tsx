import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import {
    Dialog,DialogContent,DialogHeader,DialogTitle
} from "@/components/ui/dialog";
import {Tabs, TabsContent,TabsList,TabsTrigger} from "@/components/ui/tabs";
import {useFriendStore} from "@/stores/useFriendStore";
import SentRequests from "./SentRequests";
import ReceivedRequests from "./ReceivedRequests";


interface FriendRequestDialogProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const FriendRequestDialog = ({open,setOpen}: FriendRequestDialogProps) => {
    const [tab, setTab] = useState("received"); // theo doi tab nao dang chay trong dialog : Received -> Da nhan ; sent -> da gui 
    const {getAllFriendRequests} = useFriendStore();

    useEffect(() => {
        const loadRequest = async () =>{
            try {
                await getAllFriendRequests();
            } catch (error) {
                console.log("Loi xay ra khi load request",error);

            }
            loadRequest();
        }
    }, [])


  return (
    <Dialog
        open = {open}
        onOpenChange={setOpen}
    >
        <DialogContent className="sm:max-w-lg">
            <DialogHeader>
                <DialogTitle>
                    Lời mời kết bạn
                </DialogTitle>
            </DialogHeader>
            <Tabs
                value = {tab}
                onValueChange={setTab}
                className="w-full"
            >
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                       value = "received" 
                    
                    >
                        Đã nhận
                    </TabsTrigger>
                    <TabsTrigger
                    
                    
                        value = "sent"
                    >
                        Đã gửi
                    </TabsTrigger>

                </TabsList>

                <TabsContent value="received" >
                    <ReceivedRequests/>
                </TabsContent>

               <TabsContent value="sent" >
                    <SentRequests/>
               </TabsContent>

            </Tabs>
        </DialogContent>
    </Dialog>
  )
}

export default FriendRequestDialog
