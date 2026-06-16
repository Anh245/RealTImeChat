import {create} from "zustand";
import{toast} from "sonner";
import { authService } from "@/services/authService";
import type { AuthState } from "@/types/store";

export const useAuthStore = create <AuthState>((set,get) => ({

    accessToken :null,
    user:null,
    loading:false,
    setAccessToken: (accessToken) => set({accessToken}),
    clearState: async() =>{
        set({accessToken:null,user:null,loading:false});
    },

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

    },


    //signIn
    signIn: async(username,password) =>{
        try {
            set({loading:true});
            const accessToken = await authService.signIn(username,password);
            toast.success("Đăng nhập thành công");

            //set({accessToken});
            get().setAccessToken(accessToken);
            await get().fetchMe();


        } catch (error) {
            console.log(error);
            toast.error("Loi trong qua trinh dang nhap! Vui long thu lai");
        } finally{
            set({loading:false});
        }
    },
    signOut: async() =>{
        try {
            get().clearState();
            await authService.signOut();
            toast.success("Đăng xuất thành công");
        } catch (error) {
            console.log(error);
            toast.error("Loi trong qua trinh dang xuat! Vui long thu lai");
        }
    },
    fetchMe: async()=>{
        try {
            set({loading:true});
           const user = await authService.fetchMe();
           set({user});
        } catch (error) {
            console.error(error);
            toast.error("Loi trong qua trinh lay thong tin nguoi dung! Vui long thu lai");
            set({user:null, accessToken:null});
        }finally{
            set({loading:false});
        }
    },
    refresh: async() =>{
        try {
            set({loading:true});
            const {user,fetchMe,setAccessToken} = get();
            const accessToken = await authService.refresh();
            //set({accessToken});
            setAccessToken(accessToken);
            if(!user){
                await fetchMe();
            }
                
        } catch (error) {
            console.error(error);
            toast.error("Loi trong qua trinh cap nhat token! Vui long dang nhap lai");
            get().clearState();
        }finally{
            set({loading:false});
        }
    }
}));