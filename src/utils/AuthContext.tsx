import { User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "./firbase";

export const AuthContext = createContext<{
  user: null | User | undefined;
  loading: boolean;
}>({ user: undefined, loading: true });

interface AuthProviderProps {
  children: any;
}
export const AuthProvider = (props: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(currentUser, loading);

    if (currentUser === undefined || (currentUser && loading)) {
      auth.onAuthStateChanged(setCurrentUser);
    }
    if (currentUser === null || currentUser) {
      setLoading(false);
    }
  }, [currentUser, loading]);
  return (
    <AuthContext.Provider value={{ user: currentUser, loading: loading }}>
      {props.children}
    </AuthContext.Provider>
  );
};
