"use client";
import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader from "../components/Loader/Loader.js";
import Breadcrumb from "../components/Breadcrumb";
import Button from "../components/Button";

const membersList = () => {
  const { user } = useContext(AuthContext);
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(7); // Change this value to set members per page
  const router = useRouter();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/members/memberList"
        );
        setMembers(response.data);
        setFilteredMembers(response.data);
      } catch (err) {
        console.error("Error fetching members:", err);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    setFilteredMembers(
      members.filter((members) =>
        members.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setCurrentPage(1); // Reset to first page when search query changes
  }, [searchQuery, members]);

  const handleAddNewMember = () => {
    router.push("/members/add-new-member");
  };

  const handleUpdate = (id) => {
    router.push(`members/${id}/update-member`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (user === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }
  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="content h-screen bg-gray-50">
        <Breadcrumb />
        <p className="f-heading text-gray-900 ">Members</p>
        <div className="flex justify-end mb-8">
          <Button onClick={handleAddNewMember} variant="primary">
            Add New Member
          </Button>
        </div>
        <hr className="mb-3"></hr>
        <div className="mb-4 flex w-64 f-body px-3 py-1 border rounded-md shadow-sm ">
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
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search member..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="bg-transparent focus:outline-none"
          />
        </div>
        <div className="h-96 overflow-y-auto bg-white rounded-xl">
          <table className="table-fixed w-full">
            <thead className="border-t-2 bg-light text-sky-700 text-left">
              <tr>
                <th className="px-4 py-2 border-b-[1px] f-subheading">Name</th>
                <th className="px-4 py-2 border-b-[1px] f-subheading">
                  Contact No.
                </th>
                <th className="px-4 py-2 border-b-[1px] f-subheading">
                  Address
                </th>
                <th className="px-4 py-2 border-b-[1px] f-subheading text-center">
                  Body Number
                </th>
                <th className="px-4 py-2 border-b-[1px] f-subheading text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(currentMembers) && currentMembers.length > 0 ? (
                currentMembers.map((members) => (
                  <tr key={members._id}>
                    <td className="border-b-[1px] px-4 py-3 f-body">
                      {members.name}
                    </td>
                    <td className="border-b-[1px] px-4 py-3 f-body">
                      {members.contactNumber}
                    </td>
                    <td className="border-b-[1px] px-4 py-3 f-body">
                      {members.address}
                    </td>
                    <td className="border-b-[1px] px-4 py-3 f-body text-center">
                      {members.numberOfBody}
                    </td>
                    <td className="border-b-[1px] px-4 py-3 f-body">
                      <Button
                        onClick={() => handleUpdate(members._id)}
                        className="py-2 px-3 text-xs mr-3"
                        variant="delayed"
                      >
                        Update
                      </Button>
                      <Button variant="warning" className="py-2 px-3 text-xs">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border px-4 py-2" colSpan="5">
                    No members found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-8 fixed bottom-0">
          {Array.from(
            { length: Math.ceil(filteredMembers.length / membersPerPage) },
            (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={` rounded-md px-3 py-1 font-body text-lg font-semibold ${
                  currentPage === i + 1
                    ? "bg-dark text-slate-50"
                    : "text-gray-900"
                } `}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default membersList;
