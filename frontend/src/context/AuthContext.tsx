import React, { createContext, useContext, ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { User } from "firebase/auth";

type AuthContextProps = {
  user: User | null | undefined;
  loading: boolean;
};

const AuthContext = createContext<AuthContextProps>({ user: undefined, loading: true });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};