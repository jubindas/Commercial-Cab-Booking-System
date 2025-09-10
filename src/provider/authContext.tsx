import { createContext, useEffect, useState } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  status: string;
  user_type: string;
  updated_at: string | null;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userData: User, accessToken: string) => void;
  logout: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken") || null
  );

  useEffect(() => {
    if (token) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser) as User);
      }
    }
  }, [token]);

  const login = (userData: User, accessToken: string) => {
    localStorage.setItem("authToken", accessToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setToken(accessToken);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};