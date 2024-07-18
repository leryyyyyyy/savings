"use client";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "@/context/AuthContext";

const addNewMember = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    address: "",
    numberOfBody: "",
  });

  const { name, contactNumber, address, numberOfBody } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/members/add",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("Member added:", res.data);
    } catch (err) {
      console.error("Error adding member:", err.response.data);
    }
  };

  if (user === null) {
    return <div class="h-screen flex items-center justify-center">Loading</div>; // TODO: put loading animation
  }
  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="content h-screen bg-gray-50">
        <p className="f-heading mb-5">Add New Member</p>
        <hr></hr>
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-6 gap-x-6 gap-y-8 mt-10 px-10">
            <div className="col-span-3">
              <label htmlFor="name" className="block f-body">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={onChange}
                  autoComplete="name"
                  className="f-body w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-pink-400"
                />
              </div>
            </div>
            <div className="col-span-2 ml-10">
              <label htmlFor="contactNumber" className="block f-body ">
                Contact Number
              </label>
              <div className="mt-2">
                <input
                  id="contactNumber"
                  name="contactNumber"
                  type="mobile"
                  value={contactNumber}
                  onChange={onChange}
                  autoComplete="number"
                  className="f-body w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-pink-400"
                  required
                />
              </div>
            </div>
            <div className="col-span-3">
              <label htmlFor="address" className="block f-body">
                Address
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={address}
                  onChange={onChange}
                  autoComplete="address"
                  className="f-body w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-pink-400"
                  required
                />
              </div>
            </div>
            <div className="col-span-2 ml-10">
              <label htmlFor="numberOfBody" className="block f-body">
                No. of Body/Bodies
              </label>
              <div className="mt-2">
                <input
                  id="numberOfBody"
                  name="numberOfBody"
                  type="number"
                  value={numberOfBody}
                  onChange={onChange}
                  autoComplete="number"
                  className="f-body w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-pink-400"
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
    </>
  );
};

export default addNewMember;
