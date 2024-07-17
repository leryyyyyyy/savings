"use client";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

const Navbar = () => {
  const { logout, setUser } = useContext(AuthContext);
  const router = useRouter();
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await logout();
      setUser(null);
      router.push("/login");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <nav className="flex justify-between items-center p-3 bg-dark sticky top-0">
      <h1 className="flex-grow text-center justify-center items-center text-pink-50 f-heading">
        Family Savings
      </h1>
      <button
        onClick={handleLogout}
        disabled={logoutLoading}
        className="primary-button hover:primary-button-hover ml-auto"
      >
        {logoutLoading ? "Logging out............." : "Logout"}
      </button>
    </nav>
  );
};

export default Navbar;
