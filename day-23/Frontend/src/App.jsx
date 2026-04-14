 import AppRouter from "./routes/AppRouter" ;
 import "./style.scss"
 import { AuthProvider } from "./feature/auth/auth.context.jsx";  
  



const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App

