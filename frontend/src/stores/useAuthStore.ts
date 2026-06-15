import {create} from "zustand";
import{toast} from "sonner";
import { authService } from "@/services/authService";
import type { AuthState } from "@/types/store";

export const useAuthStore = create <AuthState>((set,get) => ({

    accessToken :null,
    user:null,
    loading:false,

    signUp: async (username,password,email,firstName,lastName)=>{
        try {
            set({loading:true});

            // call API

            await authService.signUp(username,password,email,firstName,lastName);



            toast.success("Đăng ký thành công! Chuyển sang trang đăng nhập")
        } catch (error) {
            console.log(error);
            toast.error("Đăng ký thất bại! Vui lòng thử lại");
        
        } finally{
            set({loading:false})
        }

    }

}));