"use client";
import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";

const membersList = () => {
  const router = useRouter();
  const handleAddNewMember = () => {
    router.push("/members/add-new-member");
  };
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="content">
        <p className="f-heading text-gray-900">Members</p>
        <div className="flex justify-end mb-8">
          <button
            onClick={handleAddNewMember}
            className="flex primary-button hover:primary-button-hover"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
              />
            </svg>
            Add New Member
          </button>
        </div>
        <hr></hr>
      </div>
    </>
  );
};

export default membersList;
