import { createContext , useState  } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(null);

  return (
    <AuthProvider vlaue={{ user, setuser, loading, setloading }}>
      {children}
    </AuthProvider>
  );
};
