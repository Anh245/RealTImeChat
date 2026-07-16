import { friendService } from "@/services/friendService";
import type { FriendState } from "@/types/store";
import { create } from "zustand";

export const useFriendStore = create<FriendState>((set,get)=>({
    loading:false,
    searchByUsername: async(username) => {
            try {
                set({loading:true});

                const user = friendService.searchUserByUsername(username);
                
                return user;
            } catch (error) {
                console.error("Loi xay ra khi tim user bang username", error);
                return null;

            }finally{
                set({loading:false});
            }
    },
    addFriend: async(to, message) => {
        try {
            set({loading: true});

            const resultMessage = await friendService.sendFriendRequest(to, message);

            return resultMessage;
        } catch (error) {
               console.error("Loi xay ra khi addFriend", error);
               return " Loi xay khi gui ket ban.Thu lai";
            
        } finally{
            set({loading:false});
        }
    }
}))