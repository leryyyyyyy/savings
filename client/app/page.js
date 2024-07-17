import Link from "next/link";
import { AuthProvider } from "../context/AuthContext";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Savings</h1>
      <div className="space-x-4">
        <Link href="/login">
          <span className="px-4 py-2 bg-blue-500 text-white rounded">
            Login
          </span>
        </Link>
        <Link href="/register">
          <span className="px-4 py-2 bg-green-500 text-white rounded">
            Register
          </span>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
