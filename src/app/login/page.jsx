"use client";

import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { login } from '@/redux/slices/authSlice';
import { useTheme } from 'next-themes';

export default function Login() {  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const { theme } = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const resultAction = await dispatch(login(formData));
    console.log(resultAction);
    
      
      if (!resultAction.error) {
        toast.success(resultAction.payload.message || 'Login successful');
        router.push('/');
      } else {
        toast.error(resultAction.payload || 'Login failed');
      }
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`shadow-md rounded-lg p-8 max-w-md w-full space-y-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-2xl font-bold text-center ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>
          <div>
            <Label htmlFor="password" className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full pr-10 ${errors.password ? 'border-red-500' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
          </div>
          <Button type="submit" className={`w-full ${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}>
            Login
          </Button>
        </form>
        <p className={`text-sm text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Don't have an account? <Link href="/signup" className="text-blue-600 hover:text-blue-500">Click here to sign up</Link>
        </p>
      </div>

    </div>
  );
}
