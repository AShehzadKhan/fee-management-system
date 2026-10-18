import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AdminContextProvider from "./context/AdminContext.jsx";
import StudentContextProvider from "./context/StudentContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
      <AdminContextProvider>
        <StudentContextProvider>
        <App />
        </StudentContextProvider>
      </AdminContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
