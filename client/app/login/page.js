"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../components/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const payload = { email, password };
      // console.log("Request payload:", payload);

      await login(email, password);
      toast.success("Login successful!");
      router.push("/dashboard"); // Redirect to the dashboard
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Wrong email or password. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="f-heading mb-8">Savings System</h1>
        <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
          <h2 className="f-subheading mb-4 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                className=" f-body w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-sky-600"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                autoComplete="email"
                required
              />
            </div>
            <div className="mb-4">
              <input
                className=" f-body w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-sky-600"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="current-password"
                required
              />
            </div>
            <Button type="submit" variant="primary" className="w-full">
              Login
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
