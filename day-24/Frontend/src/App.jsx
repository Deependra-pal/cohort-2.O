
import AppRoutes from "./Router/AppRoutes";
import "./feature/shared/global.scss"
import { AuthProvider } from "./feature/auth/auth.context";

const App = () => {
  return (
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
  );
};

export default App;
