"use client";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Separator from "../components/Separator";
import CurrentDate from "../components/CurrentDate";
import Loader from "../components/Loader/Loader";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "@/context/AuthContext";

const Deposit = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [dropdownValue, setDropdownValue] = useState("");
  const amountDeposit = 300;
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isNoMemberModalVisible, setIsNoMemberModalVisible] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/members/memberList"
        );
        console.log("Fetched members:", response.data);
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMembers();
  }, []);

  const handleSelectChange = (e) => {
    const memberId = e.target.value;
    console.log("Selected memberId:", memberId);
    const member = members.find((m) => m._id === memberId);
    setSelectedMember(member);
    setDropdownValue(memberId);
    console.log("Selected member:", member ? member.name : "None");
  };

  const formatDateTime = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const year = String(now.getFullYear()).slice(-2);
    const formattedDate = `${month}-${day}-${year}`;
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;
    return { formattedDate, formattedTime };
  };

  const handleSave = async () => {
    if (!selectedMember) {
      setIsNoMemberModalVisible(true);
      setTimeout(() => {
        setIsNoMemberModalVisible(false);
      }, 2000); // Delay for 2 seconds
      return;
    }

    const { formattedDate, formattedTime } = formatDateTime();

    const submissionData = {
      date: `${formattedDate} ${formattedTime}`, // Combined date and time
      memberName: selectedMember.name,
      numberOfBody: selectedMember.numberOfBody,
      amount: amountDeposit * selectedMember.numberOfBody,
    };

    try {
      // Log the data instead of making the API call
      console.log("Record would be saved:", submissionData);

      // Simulate an API call
      // const response = await axios.post("http://localhost:5000/api/deposits", submissionData);

      setIsSuccessModalVisible(true);
      setTimeout(() => {
        setIsSuccessModalVisible(false);
        resetForm();
      }, 2000);
    } catch (error) {
      console.error("Error saving record:", error);
      setIsErrorModalVisible(true);
      setTimeout(() => {
        setIsErrorModalVisible(false);
      }, 2000);
    }
  };

  const resetForm = () => {
    setSelectedMember(null);
    setDropdownValue(""); // Reset dropdown value to default
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalVisible(false);
  };

  const { user } = useContext(AuthContext);
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
      <div className="content">
        <section className="flex justify-between items-center pb-10">
          <h1 className="f-heading">Deposit</h1>
          <CurrentDate />
        </section>
        <Separator />
        <div>
          <section className="h-60">
            <div className="flex items-center text-2xl font-bold f-dash">
              <p className="mr-4">Member name:</p>
              <select
                onChange={handleSelectChange}
                value={dropdownValue}
                className="border-2 border-gray-800 rounded-md w-45"
              >
                <option value="" disabled>
                  Select a member...
                </option>
                {members.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>
            {selectedMember && (
              <div className="mt-4 justify-center text-xl font-semibold">
                <p className="pb-4">
                  No. of Body: {selectedMember.numberOfBody}
                </p>
                <p>Amount: {amountDeposit * selectedMember.numberOfBody}</p>
              </div>
            )}
          </section>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="primary-button hover:primary-button-hover"
          >
            Save
          </button>
        </div>
        {isSuccessModalVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-20 rounded-md">
              <h2 className="text-xl text-green-600 font-bold mb-4">
                Record Successful!
              </h2>
            </div>
          </div>
        )}
        {isErrorModalVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-20 rounded-md">
              <h2 className="text-xl text-red-600 font-bold mb-4">
                Error Occurred
              </h2>
              <p className="mb-4">Data not saved. Please try again.</p>
            </div>
          </div>
        )}
        {isNoMemberModalVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-20 rounded-md">
              <h2 className="text-xl text-red-600 font-bold mb-4">
                No Member Selected
              </h2>
              <p className="mb-4">Please select a member before saving.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Deposit;
