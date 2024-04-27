"use client"
import { basicUrl } from '@/utils/backend';
import axios from 'axios';
import { Delete, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'



export default function DeleteHrs() {

    const [hrs, setHrs] = useState([]);


    const getHrs = async () => {
        const response = await axios.get(`${basicUrl}admin/hrs`);
        setHrs(response.data);
      }
    
    const handleDelete = async (id) => {
      const response = await axios.delete(`${basicUrl}admin/delete-user/${id}`);
      console.log(response.data);
      getHrs();
    }

useEffect(()=>{

    getHrs();

},[hrs])


return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
  <div className="py-6 px-4 md:px-6 xl:px-7.5">
    <h4 className="text-xl font-semibold text-black dark:text-white">
      hrs
    </h4>
  </div>

  <table className="border-collapse w-full">
    <thead>
      <tr className="grid grid-cols-5 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-5 md:px-6 2xl:px-7.5">
        <td className="col-span-1 flex items-center font-medium">FirstName</td>
        <td className="col-span-1 hidden items-center sm:flex font-medium">LastName</td>
        <td className="col-span-1 flex items-center font-medium">Username</td>
        <td className="col-span-1 flex items-center font-medium">Email</td>
        <td className="col-span-1 flex items-center font-medium">Delete</td>
      </tr>
    </thead>
    <tbody>
      {hrs.map((hr, key) => (
        <tr
          className="grid grid-cols-5 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-5 md:px-6 2xl:px-7.5"
          key={key}
        >
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
                {hr?.firstName}
              </p>
            </div>
          </td>
          <td className="col-span-1 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {hr?.lastName}
            </p>
          </td>
          <td className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {hr?.username}
            </p>
          </td>
          <td className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{hr?.email}</p>
          </td>
          <td className="col-span-1 flex items-center">
            <p className="text-sm w-100 text-center text-black dark:text-white"><Trash2 onClick={()=>handleDelete(hr?.id)} style={{cursor: "pointer"}} /></p>
          </td>
        </tr>

      ))}
    </tbody>
  </table>
</div>

)

}
