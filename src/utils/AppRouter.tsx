import { User } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { auth } from "./firbase";

import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

const AppRouter = () => {
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
  if (loading) {
    return (
      <div className="grid h-screen items-center justify-center place-content-center">
        <div>
          <div className="flex items-center justify-center ">
            <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
          </div>
          <div className="flex items-center justify-center ">
            <div className="w-24 h-24 border-l-2 border-gray-900 rounded-full animate-spin"></div>
          </div>
          <div className="flex items-center justify-center ">
            <div className="w-40 h-40 border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        {currentUser && currentUser.emailVerified ? (
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
