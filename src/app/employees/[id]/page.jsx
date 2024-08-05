"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchEmployeeById } from "@/redux/slices/employeeSlice";
import { ToastContainer, toast } from "react-toastify";
import { useTheme } from "next-themes";

const EmployeeDetails = ({ params }) => {
  const dispatch = useDispatch();
const [employee, setEmployee] = useState([])
  const { theme } = useTheme();
  const router = useRouter();
  const { id } = params;
  const fet = async () => {
    const {payload} = await dispatch(fetchEmployeeById(id));
    setEmployee(payload)
  };
  useEffect(() => {
    if (id) {
      fet();
    }
  }, [dispatch, id]);

if (!employee) {
  <h1>No Data for this record found</h1>
}
  return (

    <div
      className={`${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      } container mx-auto p-4`}
    >
      <h1 className="text-2xl mb-4">Employee Details</h1>
      <div>
        <p>
          <strong>Name:</strong> {employee.name}
        </p>
        <p>
          <strong>Email:</strong> {employee.email}
        </p>
        <p>
          <strong>Date of Joining:</strong> {employee.dateOfJoin}
        </p>
        <p>
          <strong>Designation:</strong> {employee.designation}
        </p>
        <p>
          <strong>Salary:</strong> {employee.salary}
        </p>
      </div>
      <button
        onClick={() => router.back()}
        className="mt-4 p-2 bg-blue-500 text-white"
      >
        Go Back
      </button>
      <ToastContainer />
   
    </div>
  );
};

export default EmployeeDetails;
