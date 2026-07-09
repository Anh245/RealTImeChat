import { BrowserRouter, Route, Routes  } from "react-router";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ChatAppPage from "./pages/ChatAppPage";
import {Toaster} from "sonner"
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { TooltipProvider } from "./components/ui/tooltip"
import { useEffect } from "react";
import { useThemeStore } from "./stores/useThemeStore";
import { useAuthStore } from "./stores/useAuthStore";
import { useSocketStore } from "./stores/useSocketStore";

function App() {
  const{isDark,setTheme} = useThemeStore();
  const {accessToken} = useAuthStore();
  const { connectSocket, disconnectSocket} = useSocketStore();
  useEffect(() => {
    setTheme(isDark);

  },[isDark]);

  useEffect(
    ()=> {
      if(accessToken){
        connectSocket();
      }

      return () => disconnectSocket();
    },[accessToken]
  );
  return (
   <>
   <Toaster richColors />
   <TooltipProvider>
    <BrowserRouter>
      <Routes>
       {/* public routes */}

       <Route path="/signup" element={<SignUpPage />} />
       <Route path="/signin" element={<SignInPage />} />
        {/* private routes */}
        <Route element={<ProtectedRoute/>}>
           <Route path="/" element={<ChatAppPage />} />
        </Route>
       
      </Routes>
    </BrowserRouter>
   </TooltipProvider>
   </>
  )
}

export default App
