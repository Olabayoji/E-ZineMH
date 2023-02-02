import { Navigate, Route, Routes } from "react-router-dom";
import ResetPassword from "../pages/Authentication/ResetPassword";
import SignIn from "../pages/Authentication/SignIn";
import SignUp from "../pages/Authentication/SignUp";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
};
