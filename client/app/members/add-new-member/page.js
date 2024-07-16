"use client";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import React from "react";

const addNewMember = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="content h-screen bg-gray-50">
        <p className="f-heading mb-5">Add New Member</p>
        <hr></hr>
        <form>
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
                  autoComplete="name"
                  className="f-body w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-pink-400"
                />
              </div>
            </div>
            <div className="col-span-2 ml-10">
              <label htmlFor="contactNum" className="block f-body ">
                Contact Number
              </label>
              <div className="mt-2">
                <input
                  id="contactNum"
                  name="contactNum"
                  type="mobile"
                  autoComplete="number"
                  className="f-body w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-pink-400"
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
                  autoComplete="address"
                  className="f-body w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-pink-400"
                />
              </div>
            </div>
            <div className="col-span-2 ml-10">
              <label htmlFor="amount" className="block f-body">
                No. of Body
              </label>
              <div className="mt-2">
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  autoComplete="number"
                  className="f-body w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-pink-400"
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
