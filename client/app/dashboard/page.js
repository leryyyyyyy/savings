"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

const Dashboard = () => {
  const { user, logout, setUser } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/user", {
          withCredentials: true,
        });
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        setUser(null);
        router.push("/login");
      }
    };

    if (!user) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;

  if (!user) return null;

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
