import type { Conversation, Message } from "./chat";
import type { User } from "./user";



export interface AuthState{
    accessToken : string | null;
    user : User | null;
    loading : boolean;

    setAccessToken: (accessToken:string) => void;
    clearState : () => void;

    signUp : (
        firstName:string,
        lastName:string,
        username:string,
        email:string,
        password:string
    ) => Promise<void>;

    signIn :(
        username: string,
        password: string
    
    ) =>Promise<void>

    signOut : () => Promise<void>

    fetchMe : () => Promise<void>
    refresh: () => Promise<void>

}
export interface ThemeState{
    isDark : boolean;

    toggleTheme : () => void;
    setTheme : (dark:boolean) => void;

}
export interface ChatState{
    conversations: Conversation[];
    messages: Record<string, {
        items: Message[],
        hasMore: boolean, // infinite scroll
        nextCursor?:string | null, // phan trang
        
    }>;
    activeConversationId: string | null;
    loading: boolean;
    
    reset: () => void;
    setActiveConversation: (id:string | null) => void; //cap nhat gia tri cua activeConversation

    fetchConversations:() => Promise<void>;
}