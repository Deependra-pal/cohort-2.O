import AppRoutes from "./Routes/AppRoutes";
import "../src/feature/shared/global.scss";
import { AuthProvider } from "./feature/auth/auth.conetxt";

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
