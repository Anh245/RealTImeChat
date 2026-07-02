export interface User{
    _id:string;
    username:string;
    email:string;
    firstName:string;
    lastName:string;
    avaterUrl?:string;
    bio?:string;
    phone?: string;
    createdAt?: string;
    updatedAt?: string;


}
export interface Friend {
  _id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
}

export interface FriendRequest {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
}