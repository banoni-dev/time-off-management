"use client"
import { basicUrl } from '@/utils/backend';
import axios from 'axios';
import { Delete, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'



export default function DeleteEmployees() {

    const [employees, setEmployees] = useState([]);


    const getEmployees = async () => {
        const response = await axios.get(`${basicUrl}rh/employees`);
        setEmployees(response.data);
      }
    
    const handleDelete = async (id) => {
      const response = await axios.delete(`${basicUrl}admin/delete-user/${id}`);
      console.log(response.data);
      getEmployees();
    }

useEffect(()=>{

    getEmployees();

},[employees])


return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
  <div className="py-6 px-4 md:px-6 xl:px-7.5">
    <h4 className="text-xl font-semibold text-black dark:text-white">
      Employees
    </h4>
  </div>

  <table className="border-collapse w-full">
    <thead>
      <tr className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-6 md:px-6 2xl:px-7.5">
        <td className="col-span-1 flex items-center font-medium">FirstName</td>
        <td className="col-span-1 hidden items-center sm:flex font-medium">LastName</td>
        <td className="col-span-1 flex items-center font-medium">Username</td>
        <td className="col-span-1 flex items-center font-medium">Email</td>
        <td className="col-span-1 flex items-center font-medium">Time offs available</td>
        <td className="col-span-1 flex items-center font-medium">Delete</td>
      </tr>
    </thead>
    <tbody>
      {employees.map((employee, key) => (
        <tr
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-6 md:px-6 2xl:px-7.5"
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
                {employee?.firstName}
              </p>
            </div>
          </td>
          <td className="col-span-1 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {employee?.lastName}
            </p>
          </td>
          <td className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {employee?.username}
            </p>
          </td>
          <td className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{employee?.email}</p>
          </td>
          <td className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{employee?.timeOffCredit?.length === 0 ? 0 : "TO-DO"}</p>
          </td>
          <td className="col-span-1 flex items-center">
            <p className="text-sm w-100 text-center text-black dark:text-white"><Trash2 onClick={()=>handleDelete(employee?.id)} style={{cursor: "pointer"}} /></p>
          </td>
        </tr>

      ))}
    </tbody>
  </table>
</div>

)

}
