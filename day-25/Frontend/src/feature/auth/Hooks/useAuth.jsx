import { useContext } from "react";
import { AuthContext } from "../auth.conetxt";
import { login, register, getMe } from "../services/auth.api";


export const useAuth = () => {

  const context = useContext(AuthContext);

  const { user, loading, setUser, setLoading } = context;

  const handleLogin = async (username, password) => {

    setLoading(true);

    const response = await login(username, password);

    setUser(response.data);

    setLoading(false);
  };

  const handleRegister = async (username, password, email) => {
    
    setLoading(true);

    const response = await register(username, password, email);

    setUser(response.data);

    setLoading(false);
  };

  return { user, loading, handleLogin, handleRegister };
};
