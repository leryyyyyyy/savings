import { Inter } from "next/font/google";
import Breadcrumb from "./components/Breadcrumb";
import "./globals.css";

import { AuthProvider } from "../context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </AuthProvider>
  );
}
