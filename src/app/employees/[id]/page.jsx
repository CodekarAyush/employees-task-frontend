"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchEmployeeById } from "@/redux/slices/employeeSlice";
import { ToastContainer } from "react-toastify";
import { useTheme } from "next-themes";

const EmployeeDetails = ({ params }) => {
  const dispatch = useDispatch();
  const [employee, setEmployee] = useState({});
  const { theme } = useTheme();
  const router = useRouter();
  const { id } = params;

  const fet = async () => {
    const { payload } = await dispatch(fetchEmployeeById(id));
    setEmployee(payload);
  };

  useEffect(() => {
    if (id) {
      fet();
    }
  }, [dispatch, id]);

  if (!employee) {
    return <h1>No Data for this record found</h1>;
  }

  return (
    <div
      className={`flex items-center justify-center min-h-screen p-4 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className={`max-w-md w-full ${theme === "dark" ? "bg-gray-900" : "bg-gray-100 "} shadow-md rounded-lg p-6`}>
        <h1 className={`text-2xl font-bold mb-4 ${
        theme === "dark" ? " text-white" : " text-black"
      } text-gray-900 dark:text-white`}>Employee Details</h1>
        <div className="space-y-4">
          <p className={`${
        theme === "dark" ? " text-white" : " text-black"
      }`}>
            <strong>Name:</strong> {employee.name}
          </p>
          <p className={`${
        theme === "dark" ? " text-white" : " text-black"
      }`}>
            <strong>Email:</strong> {employee.email}
          </p>
          <p className={`${
        theme === "dark" ? " text-white" : " text-black"
      }`}>
            <strong>Date of Joining:</strong> {employee.dateOfJoin}
          </p>
          <p className={`${
        theme === "dark" ? " text-white" : " text-black"
      }`}>
            <strong>Designation:</strong> {employee.designation}
          </p>
          <p className={`${
        theme === "dark" ? " text-white" : " text-black"
      }`}>
            <strong>Salary:</strong> {employee.salary}
          </p>
        </div>
        <button
          onClick={() => router.back()}
          className="mt-6 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Back
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EmployeeDetails;
