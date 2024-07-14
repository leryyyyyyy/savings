"use client";
import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        { username, email, password },
        { withCredentials: true } // Ensure credentials are sent
      );
      console.log(res.data); // Log response data if needed
      toast.success("Registration successful!");
      // Optionally, handle successful registration (e.g., redirect)
    } catch (err) {
      console.error(err); // Log any errors for debugging
      toast.error("Registration failed. Please try again.");
      // Optionally, handle specific error messages or display to user
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
