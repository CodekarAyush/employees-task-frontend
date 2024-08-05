"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import { fetchEmployees, addEmployee, updateEmployee, deleteEmployee } from '@/redux/slices/employeeSlice';
import { ToastContainer, toast } from 'react-toastify';
import { useTheme } from 'next-themes';
import CustomCalendar from '@/components/CustomCalendar';

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { employees, status, error } = useSelector((state) => state.employee);
  const { theme } = useTheme();

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    dateOfJoin: new Date(),
    designation: '',
    salary: '',
    remark: 'new', // Default remark for new employee
  });

  const [updateEmployeeData, setUpdateEmployeeData] = useState({
    name: '',
    email: '',
    dateOfJoin: new Date(),
    designation: '',
    salary: '',
    remark: '', // Remark field for updating employee
  });

  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [updateEmployeeId, setUpdateEmployeeId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchEmployees({ page: currentPage, limit: 8 }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleInputChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const handleUpdateInputChange = (e) => {
    setUpdateEmployeeData({ ...updateEmployeeData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setNewEmployee({ ...newEmployee, dateOfJoin: date });
  };

  const handleUpdateDateChange = (date) => {
    setUpdateEmployeeData({ ...updateEmployeeData, dateOfJoin: date });
  };

  const handleDesignationChange = (value) => {
    setNewEmployee({ ...newEmployee, designation: value });
  };

  const handleUpdateDesignationChange = (value) => {
    setUpdateEmployeeData({ ...updateEmployeeData, designation: value });
  };

  const handleRemarkChange = (value) => {
    setUpdateEmployeeData({ ...updateEmployeeData, remark: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addEmployee(newEmployee));
    toast.success('Employee added successfully!');
    setNewEmployee({
      name: '',
      email: '',
      dateOfJoin: new Date(),
      designation: '',
      salary: '',
      remark: 'new',
    });
    dispatch(fetchEmployees({ page: currentPage, limit: 8 }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateEmployee({ id: updateEmployeeId, employeeData: updateEmployeeData }));
    toast.success('Employee updated successfully!');
    setIsUpdateMode(false);
    setUpdateEmployeeId(null);
    setUpdateEmployeeData({
      name: '',
      email: '',
      dateOfJoin: new Date(),
      designation: '',
      salary: '',
      remark: '',
    });
    dispatch(fetchEmployees({ page: currentPage, limit: 8 }));
  };

  const handleUpdate = (employee) => {
    setUpdateEmployeeData({
      name: employee.name,
      email: employee.email,
      dateOfJoin: new Date(employee.dateOfJoin),
      designation: employee.designation,
      salary: employee.salary,
      remark: employee.remark,
    });
    setIsUpdateMode(true);
    setUpdateEmployeeId(employee._id);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteEmployee(id));
    toast.success('Employee deleted successfully!');
    dispatch(fetchEmployees({ page: currentPage, limit: 8 }));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleRowClick = (id) => {
    router.push(`/employees/${id}`);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} container mx-auto p-4`}>
      <Dialog>
        <DialogTrigger asChild>
          <Button className={` ${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}>Add Employee</Button>
        </DialogTrigger>
        <DialogContent className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} sm:max-w-[425px]`}>
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="name" placeholder="Employee Name" value={newEmployee.name} onChange={handleInputChange} />
            <Input name="email" type="email" placeholder="Email" value={newEmployee.email} onChange={handleInputChange} />
            <CustomCalendar selectedDate={newEmployee.dateOfJoin} handleDateChange={handleDateChange} />
            <Select onValueChange={handleDesignationChange} value={newEmployee.designation}>
              <SelectTrigger>
                <SelectValue placeholder="Select designation" />
              </SelectTrigger>
              <SelectContent className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                <SelectItem value="java">Java Developer</SelectItem>
                <SelectItem value="mern">MERN Developer</SelectItem>
                <SelectItem value="hr">HR Executive</SelectItem>
                <SelectItem value="intern">Intern</SelectItem>
              </SelectContent>
            </Select>
            <Input name="salary" type="number" placeholder="Salary" value={newEmployee.salary} onChange={handleInputChange} />
            <Button type="submit" className={` ${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}>Submit</Button>
          </form>
        </DialogContent>
      </Dialog>

      {isUpdateMode && (
        <Dialog open={isUpdateMode} onOpenChange={setIsUpdateMode}>
          <DialogContent className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} sm:max-w-[425px]`}>
            <DialogHeader>
              <DialogTitle>Update Employee</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <Input name="name" placeholder="Employee Name" value={updateEmployeeData.name} onChange={handleUpdateInputChange} />
              <Input name="email" type="email" placeholder="Email" value={updateEmployeeData.email} onChange={handleUpdateInputChange} />
              <CustomCalendar selectedDate={updateEmployeeData.dateOfJoin} handleDateChange={handleUpdateDateChange} />
              <Select onValueChange={handleUpdateDesignationChange} value={updateEmployeeData.designation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select designation" />
                </SelectTrigger>
                <SelectContent className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                  <SelectItem value="java">Java Developer</SelectItem>
                  <SelectItem value="mern">MERN Developer</SelectItem>
                  <SelectItem value="hr">HR Executive</SelectItem>
                  <SelectItem value="intern">Intern</SelectItem>
                </SelectContent>
              </Select>
              <Input name="salary" type="number" placeholder="Salary" value={updateEmployeeData.salary} onChange={handleUpdateInputChange} />
              <Select onValueChange={handleRemarkChange} value={updateEmployeeData.remark}>
                <SelectTrigger>
                  <SelectValue placeholder="Select remark" />
                </SelectTrigger>
                <SelectContent className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="average">Average</SelectItem>
                  <SelectItem value="bad">Bad</SelectItem>
                  <SelectItem value="outstanding">Outstanding</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit" className={` ${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}>Update</Button>
            </form>
          </DialogContent>
        </Dialog>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date of Joining</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee._id} onClick={() => handleRowClick(employee._id)} className="cursor-pointer">
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{format(new Date(employee.dateOfJoin), 'PPP')}</TableCell>
              <TableCell>
                <Button variant="outline" className={` ${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`} onClick={(e) => { e.stopPropagation(); handleUpdate(employee); }}>Update</Button>
                <Button variant="destructive" className={` ${theme === 'dark' ? 'bg-red-600 text-white' : 'bg-red-500 text-white'}`} onClick={(e) => { e.stopPropagation(); handleDelete(employee._id); }}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(100 / 8) }, (_, index) => index + 1).map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? 'solid' : 'outline'}
            onClick={() => handlePageChange(page)}
            className="mx-1"
          >
            {page}
          </Button>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Home;
