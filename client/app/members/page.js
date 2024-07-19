"use client";
import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/AuthContext";
import axios from "axios";

const membersList = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/members/memberList"
        );
        setMembers(response.data);
      } catch (err) {
        console.error("Error fetching members:", err);
      }
    };

    fetchMembers();
  }, []);

  // useEffect(() => {
  //   if (user) {
  //     fetch("/api/members")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setMembers(data);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching members: " + error);
  //         setLoading(false);
  //       });
  //   }
  // }, [user]);

  // if (!user) {
  //   return (
  //     <div className="h-screen flex items-center justify-center">Loading</div>
  //   ); // TODO: put loading animation
  // }

  // if (user === null) {
  //   return <div class="h-screen flex items-center justify-center">Loading</div>; // TODO: put loading animation
  // }
  // if (!user) {
  //   return null;
  // }
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
        {/* {loading ? (
          <div>Loading...</div>
        ) : ( */}
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Contact Number</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Number of Body</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(members) && members.length > 0 ? (
              members.map((members) => (
                <tr key={members._id}>
                  <td className="border px-4 py-2">{members.name}</td>
                  <td className="border px-4 py-2">{members.contactNumber}</td>
                  <td className="border px-4 py-2">{members.address}</td>
                  <td className="border px-4 py-2">{members.numberOfBody}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border px-4 py-2" colSpan="4">
                  No members found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* )} */}
      </div>
    </>
  );
};

export default membersList;
