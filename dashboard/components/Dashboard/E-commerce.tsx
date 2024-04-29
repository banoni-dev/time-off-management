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
        <AreaChart />
        <SimpleBar />
      </div>

    </>
    )}
    </>
  );
};

export default ECommerce;
