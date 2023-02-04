import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "../components/Navigation/Footer";
import Navbar from "../components/Navigation/Navbar";
import Contact from "../pages/Contact";
import Gallery from "../pages/Gallery";
import HomePage from "../pages/HomePage";
import Overview from "../pages/Overview";

export const PrivateRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
};
