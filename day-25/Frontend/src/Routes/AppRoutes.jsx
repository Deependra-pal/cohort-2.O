import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Login from '../feature/auth/pages/Login'
import Register from '../feature/auth/pages/Register'

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="*" element={<h1>404 Not Found</h1>}/>
        <Route path="/" element={<h1>Welcome to 4 layer architecture in React</h1>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
 