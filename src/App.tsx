import React from "react";
import Layout from "./components/Layout";
import AppRouter from "./utils/AppRouter";
import { AuthProvider } from "./utils/AuthContext";

function App() {
  return (
    <Layout>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </Layout>
  );
}

export default App;
