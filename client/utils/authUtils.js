// utils/authUtils.js
import axios from "axios";

export const checkAuth = async (setUser, setAuthChecked, router) => {
  try {
    const res = await axios.get("http://localhost:5000/api/auth/user", {
      withCredentials: true,
    });
    setUser(res.data);
  } catch (err) {
    setUser(null);
    if (router) {
      router.push("/login");
    }
  } finally {
    setAuthChecked(true);
  }
};
