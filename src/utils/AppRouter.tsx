import { User } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoadingScreen from "../components/UI/LoadingScreen";
import { AuthContext } from "./AuthContext";

import { auth } from "./firbase";

import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

const AppRouter = () => {
  // const [currentUser, setCurrentUser] = useState<User | null>();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   console.log(currentUser, loading);

  //   if (currentUser === undefined || (currentUser && loading)) {
  //     auth.onAuthStateChanged(setCurrentUser);
  //   }
  //   if (currentUser === null || currentUser) {
  //     setLoading(false);
  //   }
  // }, [currentUser, loading]);
  const { loading, user } = useContext(AuthContext);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <BrowserRouter>
      <Routes>
        {user && user.emailVerified ? (
          <Route path="/*" element={<PrivateRoutes />} />
        ) : (
          <Route path="/*" element={<PublicRoutes />} />
        )}

        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
