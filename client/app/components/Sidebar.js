import React, { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import Loader from "../components/Loader/Loader.js";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  if (user === null) {
    return <Loader />;
  }
  if (!user) {
    return null;
  }
  const pathname = usePathname();
  const isActive = (path) => pathname === path;
  return (
    <div className="w-60 h-screen bg-pink-400 text-gray-100 fixed">
      <div className="p-4">
        <nav className="space-y-2">
          <a
            href="/dashboard"
            className={`${
              isActive("/dashboard") ? "bg-pink-500" : ""
            } flex p-2 rounded-lg text-pink-50 font-headings text-lg font-medium hover:bg-pink-200 hover:text-gray-900`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 mr-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            Dashboard
          </a>
          <a
            href="/deposit"
            className={`${
              isActive("/deposit") ? "bg-pink-500" : ""
            } flex p-2 rounded-lg text-pink-50 font-headings text-lg font-medium hover:bg-pink-200 hover:text-gray-900`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 mr-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
              />
            </svg>
            Deposit
          </a>
          <a
            href="/members"
            className={`${
              isActive("/members") ? "bg-pink-500" : ""
            } flex p-2 rounded-lg text-pink-50 font-headings text-lg font-medium hover:bg-pink-200 hover:text-gray-900`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 mr-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>
            Members
          </a>
          <a
            href="/reports"
            className={`${
              isActive("/reports") ? "bg-pink-500" : ""
            } flex p-2 rounded-lg text-pink-50 font-headings text-lg font-medium hover:bg-pink-200 hover:text-gray-900`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 mr-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
            Reports
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
