"use client"
import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import axios from "axios";
import { basicUrl } from "@/utils/backend";
import { formatDateToISO, getUserIdFromToken } from "@/utils/user";

export const metadata: Metadata = {
  title: "Add TimeOff page",
  description: "",
};

export const AddTimeOff: React.FC = () => {

    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [type, setType] = useState<string>("sick");
    const [reason, setReason] = useState<string>("");
    const [id, setId] = useState<string>("");


  useEffect(() => {
    const userId = getUserIdFromToken(localStorage.getItem("token"));
    setId(userId);
  }, []);




    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(startDate, endDate, type, reason, id);
        const response = await axios.post(`${basicUrl}employee/request`, {
            startDate: formatDateToISO(startDate),
            endDate: formatDateToISO(endDate),
            type,
            reason,
            status: "pending",
            userId: id,
        });
        console.log(response.data);
    }



  return (
    <>
      <Breadcrumb pageName="Add a TimeOff" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="w-full border-stroke dark:border-strokedark">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Start Date
                  </label>
                  <div className="relative">
                    <input
                      onChange={(e) => setStartDate(e.target.value)}
                      type="date"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    End Date
                  </label>
                  <div className="relative">
                    <input
                      onChange={(e) => setEndDate(e.target.value)}
                      type="date"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Type
                  </label>
                  <div className="relative">
                    <select
                      onChange={(e) => setType(e.target.value)}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option value="sick">Sick</option>
                      <option value="vacation">Vacation</option>
                      <option value="personal">Personal</option>
                    </select>


                  </div>
                </div>


                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Reason
                  </label>
                  <div className="relative">
                    <textarea
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Reason for the time off"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    ></textarea>

                  </div>
                </div>


                <div className="mb-5">
                  <input
                    type="submit"
                    value="Add a TimeOff"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>

              

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

