"use client";
import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Navbar";
import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../../components/Loader/Loader.js";

const editMember = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { id } = useParams();
  const [member, setMember] = useState({
    name: "",
    contactNumber: "",
    address: "",
    numberOfBody: "",
  });

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/members/member/${id}`
        );
        setMember(response.data);
      } catch (error) {
        console.error("Error fetching member data:", error);
      }
    };

    if (id) {
      fetchMember();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/members/editMember/${id}`,
        member
      );
      toast.success("Member added successfully!");
      router.push("/members");
    } catch (error) {
      console.error("Error updating member:", error);
    }
  };

  if (user === null) {
    return <Loader />;
  }
  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="content h-screen bg-gray-50">
        <p className="f-heading mb-5">Edit Member</p>
        <hr></hr>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-6 gap-x-6 gap-y-8 mt-10 px-10">
            <div className="col-span-3">
              <label htmlFor="name" className="block f-body">
                Name *
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={member.name}
                  onChange={handleChange}
                  autoComplete="name"
                  className="f-body w-full px-3 py-1 border rounded-md shadow-sm focus:outline-none focus:border-sky-600"
                  required
                />
              </div>
            </div>
            <div className="col-span-2 ml-10">
              <label htmlFor="contactNumber" className="block f-body ">
                Contact Number *
              </label>
              <div className="mt-1">
                <input
                  id="contactNumber"
                  name="contactNumber"
                  type="mobile"
                  value={member.contactNumber}
                  onChange={handleChange}
                  autoComplete="number"
                  className="f-body w-full px-3 py-1 border rounded-md shadow-sm focus:outline-none focus:border-sky-600"
                  required
                />
              </div>
            </div>
            <div className="col-span-3">
              <label htmlFor="address" className="block f-body">
                Address *
              </label>
              <div className="mt-1">
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={member.address}
                  onChange={handleChange}
                  autoComplete="address"
                  className="f-body w-full px-3 py-1 border rounded-md shadow-sm focus:outline-none focus:border-sky-600"
                  required
                />
              </div>
            </div>
            <div className="col-span-2 ml-10">
              <label htmlFor="numberOfBody" className="block f-body">
                No. of Body/Bodies *
              </label>
              <div className="mt-1">
                <input
                  id="numberOfBody"
                  name="numberOfBody"
                  type="number"
                  value={member.numberOfBody}
                  onChange={handleChange}
                  autoComplete="number"
                  className="f-body w-full px-3 py-1 border rounded-md shadow-sm focus:outline-none focus:border-sky-600"
                  required
                />
              </div>
            </div>
          </div>
          <div className="col-span-2 flex justify-end pr-10 mt-16">
            <button
              type="submit"
              className="primary-button hover:primary-button-hover w-1/5 "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default editMember;
