import { User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "./firbase";

export const AuthContext = createContext<null | User | undefined>(null);
interface AuthProviderProps {
  children: any;
}
export const AuthProvider = (props: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>();

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>
      {props.children}
    </AuthContext.Provider>
  );
};
