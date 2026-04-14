import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../feature/auth/pages/Login";
import Register from "../feature/auth/pages/Register";  
      

const AppRouter = () => {
  return   (
  < BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
     </BrowserRouter>
      
  )  
  
}

export default AppRouter
