import { User } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { createContext, useEffect, useRef, useState } from "react";
import { auth, db } from "./firbase";

export const AuthContext = createContext<{
  user: null | User | undefined;
  loading: boolean;
  admin: boolean;
}>({ user: undefined, loading: true, admin: false });

interface AuthProviderProps {
  children: any;
}
export const AuthProvider = (props: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);

  const effectRan = useRef(false);
  const [error, setError] = useState<null | any>(false);
  const [adminList, setadminList] = useState<any>([]);
  // const adminList: any[] = [];
  const checkRole = async () => {
    setLoading(true);
    try {
      const docRef = collection(db, "admin");
      const docSnap = await getDocs(docRef);

      if (docSnap && docSnap.docs.length > 0) {
        let list: any[] = [];
        docSnap.docs.map((doc) => {
          return list.push(doc.data());
        });
        setadminList([...list]);
      } else {
        setError("Error getting recent login. Try again later");
      }
    } catch (err: any) {
      setError(true);
      setLoading(false);
      return err;
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log(adminList);
    if (currentUser === undefined || (currentUser && loading)) {
      auth.onAuthStateChanged(setCurrentUser);
    }
    if (effectRan.current === false) {
      checkRole();
    }

    if (currentUser === null || currentUser) {
      setLoading(false);
    }
    if (adminList.length > 0) {
      // admin check
      setAdmin(
        adminList.some((person: any) => person.email === currentUser?.email)
      );
    }
    return () => {
      effectRan.current = true;
    };
  }, [currentUser, loading, adminList]);
  return (
    <AuthContext.Provider
      value={{ user: currentUser, loading: loading, admin: admin }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
