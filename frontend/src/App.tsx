import { BrowserRouter, Route, Routes  } from "react-router";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ChatAppPage from "./pages/ChatAppPage";
import {Toaster} from "sonner"
function App() {
  

  return (
   <>
   <Toaster richColors />
    <BrowserRouter>
      <Routes>
       {/* public routes */}

       <Route path="/signup" element={<SignUpPage />} />
       <Route path="/signin" element={<SignInPage />} />
        {/* private routes */}
        <Route path="/" element={<ChatAppPage />} />
      </Routes>
    </BrowserRouter>
   </>
  )
}

export default App
