import AppRoutes from "./Routes/AppRoutes";
import "../src/feature/shared/global.scss";
import { AuthProvider} from "./feature/auth/auth.conetxt";
import Feed from "./feature/post/pages/Feed"
import { PostContextProvider } from "./feature/post/post.context";


const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
        <AppRoutes />
      </PostContextProvider>
    </AuthProvider>
  );
};
export default App;
