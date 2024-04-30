"use client";
import React, { useEffect, useState } from "react";

import { AreaChart, SimpleBar } from "@/components/Charts";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";

// without this the component renders on server and throws an error
import dynamic from "next/dynamic";
import DataCard from "../Cards/DataCard";
import axios from "axios";
import { basicUrl } from "@/utils/backend";
import { getUserIdFromToken } from "@/utils/user";
const MapOne = dynamic(() => import("../Maps/MapOne"), {
  ssr: false,
});






const ECommerce: React.FC = () => {


  const [userInfo, setUserInfo] = useState({});
  const [timeOffs, setTimeOffs] = useState(0);
  const [timeOffCredit, setTimeOffCredit] = useState(0);
  const [timeOffHistory, setTimeOffHistory] = useState(0);
  const [allTimeOffs, setAllTimeOffs] = useState(0);
  const [allTimeOffsHistory, setAllTimeOffsHistory] = useState(0);
  const [allEmployees, setAllEmployees] = useState(0);
  const [allHr, setAllHr] = useState(0);



  const getInfo = async() => {
    const response = await axios.get(`${basicUrl}admin/Hrs`);
    setAllHr(response.data.length);
    const response2 = await axios.get(`${basicUrl}rh/employees`);
    setAllEmployees(response2.data.length);
    const response3 = await axios.get(`${basicUrl}rh/all-requests`);
    setAllTimeOffsHistory(response3.data.length);
    const response4 = await axios.get(`${basicUrl}rh/approved-requests`);
    setAllTimeOffs(response4.data.length);
  }


  const getUserInfo = async(userId: string) => {
    const response = await axios.get(`${basicUrl}user/profile/${userId}`);
    setUserInfo(response.data);
    console.log(response.data);
    setTimeOffCredit(response.data.timeOffCredit);
    setTimeOffs(response.data.timeOffs.length);
    setTimeOffHistory(response.data.timeOffHistory.length);
  }
  useEffect(() => {
    const token: string = localStorage.getItem("token") || "";
    const userId: string = getUserIdFromToken(token);
    getUserInfo(userId);
    getInfo();
  },[]);
  

  return (
    <>{userInfo.role === "employee" && (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <DataCard name="approved Timeoffs" amount={timeOffs} />
        <DataCard name="Credits available" amount={timeOffCredit} />
        <DataCard name="Total History" amount={timeOffHistory} />
      </div>
      <div className="space-y-5 py-5">
        <AreaChart role={userInfo?.role} />
        <SimpleBar role={userInfo?.role} />
      </div>

    </>
    )}
    {userInfo.role === "admin" && (
      <>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
          <DataCard name="Total Employees" amount={allEmployees} />
          <DataCard name="Total HRs" amount={allHr} />
        <DataCard name="approved Timeoffs" amount={timeOffs} />
        </div>
        <div className="space-y-5 py-5">
        <AreaChart role={userInfo?.role} />
      </div>
      </>
    )}
    {userInfo.role === "hr" && (
      <>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
          <DataCard name="Total Employees" amount={allEmployees} />
          <DataCard name="approved Timeoffs" amount={allTimeOffs} />
          <DataCard name="Total History" amount={allTimeOffsHistory} />
        </div>
        <div className="space-y-5 py-5">
        <AreaChart role={userInfo?.role} />
      </div>

      </>
    )}
    </>
  );
};

export default ECommerce;
