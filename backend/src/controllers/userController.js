export const authMe = async(req,res) =>{
    try {
        const user = req.user;

        return res.status(200).json(user);
    } catch (error) {
        console.error("Loi khi xac thuc nguoi dung goi authMe", error);
        return res.status(500).json({ message: "Loi he thong" });
    }
};
export const searchUserByUsername = async (req,res) => {
    try {
        const {username} = req.query;
        if(!username || username.trim() ===""){
            return res.status(400).json({message:" Can cung cap username trong query"});
        }
        const user = await User.findOne({username}).select("_id displayName username, avatarUrl");

        return res.satus(200).json({user});


    } catch (error) {
        console.error("Loi xay ra khi searchUserByUsername");
        return res.satus(500).json({message:"Loi he thong"});     
    }
};
export const test = async(req,res) =>{
    return res.status(204);
};