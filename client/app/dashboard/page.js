"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

const Dashboard = () => {
  const { user, logout, setUser } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/user", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        setUser(null);
        router.push("/login");
      } finally {
        setLoading(false);
        setAuthChecked(true);
      }
    };

    if (!authChecked) {
      checkAuth();
    }
  }, [authChecked, setUser, router]);

  const handleLogout = async () => {
    setLogoutLoading(true);
    console.log("Logout initiated");
    try {
      await logout();
      setUser(null);
      router.push("/login");
      console.log("Logout successful");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLogoutLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!user) return null;

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <button onClick={handleLogout} disabled={logoutLoading}>
        {logoutLoading ? "Logging out............." : "Logout"}
      </button>
    </div>
  );
};

export default Dashboard;
