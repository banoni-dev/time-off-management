"use client"
import { basicUrl } from '@/utils/backend';
import { getUserIdFromToken } from '@/utils/user';
import axios from 'axios';
import { time } from 'console';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export default function EditTimeOffs() {
    const [id, setId] = useState<string>("");
    const [timeoffs, setTimeoffs] = useState([]);


    const getTimeOffs = async () => {
      if(id){
        const response = await axios.get(`${basicUrl}rh/all-requests`);
        // if approved is true, then filter the timeoffs to only show the approved ones
        console.log(response.data);
          setTimeoffs(response.data.filter((timeoff) => timeoff.status === "pending").reverse());
        }
    }
    const handleApprove = async (id) => {
        const response = await axios.put(`${basicUrl}admin/approve-request/${id}`);
        console.log(response.data);
        getTimeOffs();
    }
    const handleReject = async (id) => {
        const response = await axios.put(`${basicUrl}admin/reject-request/${id}`);
        console.log(response.data);
        getTimeOffs();
    }



useEffect(()=>{
    const userId = getUserIdFromToken(localStorage.getItem("token"));
    setId(userId);
    getTimeOffs();

},[id])


return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
  <div className="py-6 px-4 md:px-6 xl:px-7.5">
    <h4 className="text-xl font-semibold text-black dark:text-white">
      History of time offs
    </h4>
  </div>

  <table className="border-collapse w-full">
    <thead>
      <tr className="grid grid-cols-8 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <td className="col-span-1 flex items-center font-medium">Full name</td>
        <td className="col-span-1 flex items-center font-medium">Start Date</td>
        <td className="col-span-1 hidden items-center sm:flex font-medium">End Date</td>
        <td className="col-span-1 flex items-center font-medium">Type</td>
        <td className="col-span-1 flex items-center font-medium">Reason</td>
        <td className="col-span-1 flex items-center font-medium">Created At</td>
        <td className="col-span-2 ml-46 flex items-center font-medium">Action</td>
      </tr>
    </thead>
    <tbody>
      {timeoffs.map((timeoff, key) => (
        <tr
          className="grid grid-cols-8 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <td className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{timeoff?.user?.firstName + " " + timeoff?.user?.lastName}</p>
          </td>
          <td className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {/* <div className="h-12.5 w-15 rounded-md">
                <Image
                  src={product.image}
                  width={60}
                  height={50}
                  alt="Product"
                />
              </div> */}
              <p className="text-sm text-black dark:text-white">
                {timeoff?.startDate.slice(0, 10)}
              </p>
            </div>
          </td>
          <td className="col-span-1 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {timeoff?.endDate.slice(0, 10)}
            </p>
          </td>
          <td className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {timeoff?.type}
            </p>
          </td>
          <td className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{timeoff?.reason}</p>
          </td>
          <td className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {timeoff?.createdAt.slice(0, 10) + " | " + timeoff?.createdAt.slice(11, 19)}
            </p>
          </td>
          <td className="col-span-1 flex ml-5 items-center">
            <button onClick={()=>handleApprove(timeoff?.id)} className="bg-primary w-[150px] text-white rounded-lg px-3 py-1.5 text-sm">Approve</button>
          </td>
          <td className="col-span-1 ml-10 flex items-center">
            <button onClick={()=>handleReject(timeoff?.id)} className="bg-red-500 w-[150px] text-white rounded-lg px-3 py-1.5 text-sm">Reject</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

)

}
