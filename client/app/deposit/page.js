"use client";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Separator from "../components/Separator";
import CurrentDate from "../components/CurrentDate";
import Total from "../components/Total";
import Loader from "../components/Loader/Loader";
import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import AuthContext from "@/context/AuthContext";
import Breadcrumb from "../components/Breadcrumb";

import Modal from "../components/Modal";
import ConfirmationModal from "../components/ConfirmationModal";
import Button from "../components/Button";

const formatDate = (date) => {
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${month}-${day}`;
};

const getWeekRange = (year, weekNumber) => {
  const startOfYear = new Date(Date.UTC(year, 0, 1));
  const dayOfWeek = startOfYear.getUTCDay();
  const daysUntilMonday = (1 - dayOfWeek + 7) % 7; // 1 = Monday
  const startOfWeek = new Date(startOfYear);
  startOfWeek.setUTCDate(startOfYear.getUTCDate() + daysUntilMonday);
  startOfWeek.setUTCDate(startOfWeek.getUTCDate() + (weekNumber - 1) * 7);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 6);
  return {
    startDate: formatDate(startOfWeek),
    endDate: formatDate(endOfWeek),
  };
};

const Deposit = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [dropdownValue, setDropdownValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const amountDeposit = 300;
  const [submissionData, setSubmissionData] = useState({});
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isNoMemberModalVisible, setIsNoMemberModalVisible] = useState(false);
  const dropdownRef = useRef(null);

  const [selectedWeek, setSelectedWeek] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/deposit/depositList?selectedWeek=${selectedWeek}`
        );
        console.log("Fetched members:", response.data);
        setMembers(response.data);
        setFilteredMembers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMembers();
  }, [selectedWeek]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setDropdownValue(value);
    setShowDropdown(true);

    const filtered = members.filter((member) =>
      member.name.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredMembers(filtered);
  };

  const handleSelectMember = (member) => {
    setSelectedMember(member);
    setDropdownValue(member.name);
    setShowDropdown(false);
  };

  const handleSave = async () => {
    if (!selectedMember) {
      setIsNoMemberModalVisible(true);
      setTimeout(() => {
        setIsNoMemberModalVisible(false);
      }, 2000);
      return;
    }

    const submissionData = {
      memberId: selectedMember._id,
      depositAmount: amountDeposit * selectedMember.numberOfBody,
      numberOfBody: selectedMember.numberOfBody,
      selectedWeek,
    };
    setSubmissionData(submissionData);
    setConfirmationVisible(true);
  };

  const handleConfirmSave = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/deposit/addDeposit",
        submissionData
      );

      console.log(submissionData);
      setIsSuccessModalVisible(true);
      setTimeout(() => {
        setIsSuccessModalVisible(false);
        resetForm();
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error saving record:", error);
      setIsErrorModalVisible(true);
      setTimeout(() => {
        setIsErrorModalVisible(false);
      }, 2000);
    } finally {
      setConfirmationVisible(false);
    }
  };

  const handleCancel = () => {
    setConfirmationVisible(false);
  };
  const resetForm = () => {
    setSelectedMember(null);
    setDropdownValue("");
    setFilteredMembers(members);
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalVisible(false);
  };

  const { user } = useContext(AuthContext);
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

  const now = new Date();
  const currentYear = now.getUTCFullYear();
  const currentWeek =
    Math.floor(
      (now.getTime() - new Date(Date.UTC(currentYear, 0, 1)).getTime()) /
        (24 * 60 * 60 * 1000 * 7)
    ) + 1;

  const { startDate: currentStartDate, endDate: currentEndDate } = getWeekRange(
    currentYear,
    currentWeek
  );

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="content h-screen">
        <section className="flex justify-between items-center pb-10">
          <Total />
          <CurrentDate />
        </section>
        <Separator />
        <Breadcrumb />

        <h1 className="f-heading pb-8">Deposit</h1>
        <main className="h-auto p-12 border-2 border-sky-500 bg-sky-50 rounded-md">
          <div className="flex flex-col items-start f-dash mb-10">
            <div className="flex items-center f-dash">
              <label htmlFor="weekSelect" className="mr-10 text-2xl font-bold">
                Select Week:
              </label>
              <div className="relative w-64">
                <select
                  className="border-2 border-gray-800 rounded-md w-full text-xl p-1"
                  id="weekSelect"
                  value={selectedWeek}
                  onChange={(e) => setSelectedWeek(e.target.value)}
                >
                  <option value="">
                    Current Week {currentWeek} ({currentStartDate} -{" "}
                    {currentEndDate})
                  </option>
                  {Array.from({ length: 52 }, (_, i) => {
                    const weekNumber = i + 1;
                    const { startDate, endDate } = getWeekRange(
                      currentYear,
                      weekNumber
                    );
                    return (
                      <option key={weekNumber} value={weekNumber}>
                        Week {weekNumber} ({startDate} - {endDate})
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="flex mt-5">
              <p className="mr-4 text-2xl font-bold">Member name:</p>
              <div className="relative w-45" ref={dropdownRef}>
                <input
                  type="text"
                  value={dropdownValue}
                  onChange={handleInputChange}
                  onClick={() => setShowDropdown(true)}
                  className="border-2 border-gray-800 rounded-md w-full text-xl p-1"
                  placeholder="Select a member..."
                />
                {showDropdown && (
                  <div className="absolute left-0 right-0 bg-white border-2 border-gray-800 rounded-md z-10 max-h-60 overflow-y-auto">
                    {filteredMembers.length > 0 ? (
                      filteredMembers.map((member) => (
                        <div
                          key={member._id}
                          className="text-xl cursor-pointer p-2 hover:bg-gray-200"
                          onClick={() => handleSelectMember(member)}
                        >
                          {member.name}
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-gray-500">No matches found</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          {selectedMember && (
            <div className="f-dash mt-8 justify-center">
              <Separator />
              <h3 className="text-2xl pb-3 text-semibold">Summary:</h3>
              <div className="b-font text-lg">
                <p>Member name: {selectedMember.name}</p>
                <p>No. of Body: {selectedMember.numberOfBody}</p>
                <p>Amount: {amountDeposit * selectedMember.numberOfBody}</p>
              </div>
            </div>
          )}
        </main>

        <div className="flex justify-end">
          <Button onClick={handleSave} className="mt-10" variant="primary">
            Save
          </Button>
        </div>

        {confirmationVisible && (
          <ConfirmationModal
            message="You are about to record the following information:"
            memberName={selectedMember.name}
            numberOfBody={selectedMember.numberOfBody}
            amount={amountDeposit * selectedMember.numberOfBody}
            onCancel={handleCancel}
            onConfirm={handleConfirmSave}
          />
        )}

        {isSuccessModalVisible && <Modal message="Record successful!" />}
        {isErrorModalVisible && (
          <Modal
            message="An error occured."
            content="Data not saved. Please try again."
          />
        )}
      </div>
    </>
  );
};

export default Deposit;
