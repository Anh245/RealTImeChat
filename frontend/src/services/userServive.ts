import api from "@/lib/axios";


export const userServive = {
    uploadAvatar: async(fromData: FormData) =>{
        const res = await api.post("/users/uploadAvatar", FormData,{
            headers:{"Content-Type":"multipart/form-data"}
        });

        if(res.status === 400){

            throw new Error(res.data.message);
        }

        return res.data;
    
    }
}