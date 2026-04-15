import {BrowserRouter,Route, Routes} from "react-router-dom"
import Login from "../feature/auth/pages/Login"
import Register from "../feature/auth/pages/Register"


const AppRoutes = () => {
  return (
    <BrowserRouter> 
    <Routes>
        <Route path="*" element ={<h1> Page not found </h1>}/>
        <Route path="/"  element={<h1> Home Page </h1>}/>
        <Route path="/login" element={ <Login />} />
        <Route path="/register" element={ <Register />} />
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes 
