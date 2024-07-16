"use client";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Total from "../components/Total";
import CurrentDate from "../components/CurrentDate";
import Sidebar from "../components/Sidebar";
// TODO: PUT THIS TO USE THE CHECK USER STATE(IF LOGGED IN OR NOT)
import { useRouter } from "next/navigation";
import AuthContext from "../../context/AuthContext";
import { checkAuth } from "@/utils/authUtils";
// TODO: END
const Dashboard = () => {
  // TODO: PUT THIS TO USE THE CHECK USER STATE(IF LOGGED IN OR NOT)
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!authChecked) {
      checkAuth(setUser, setAuthChecked, router);
    }
  }, [authChecked, setUser, router]);

  if (!user) return null;
  // TODO: END
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="flex justify-between items-center p-4">
        <Total /> <CurrentDate />
      </div>
    </>
  );
};

export default Dashboard;
