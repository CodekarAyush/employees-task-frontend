"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import Link from "next/link";
import { loadUser, logout } from "@/redux/slices/authSlice";
import { useTheme } from "next-themes";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isAuth } = useSelector((state) => state.auth);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
    dispatch(loadUser());
  }, [dispatch]);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  if (!mounted) {
    return null;
  }

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xs bg-opacity-70 shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link className={`text-xl list font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} href="/">
              Logo
            </Link>
          </div>
          <div className="hidden md:flex md:space-x-8 md:items-center">
            <Link className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} href="/">
              Home
            </Link>
            <Link className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} href="/employees">
              Employees
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isAuth ? (
              <>
                <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{user?.email}</span>
                <button
                  onClick={handleLogout}
                  className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}>
                    Login
                  </button>
                </Link>
                <Link href="/signup">
                  <button className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}>
                    Signup
                  </button>
                </Link>
              </>
            )}
            <ModeToggle />
          </div>
          <div className="md:hidden">
            <button onClick={toggleDrawer} className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={toggleDrawer}></div>
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`relative w-64 h-full shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4">
                <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{user?.email}</span>
                <button onClick={toggleDrawer} className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <XIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="flex items-center flex-col h-screen">
                <div className="p-4">
                  <ModeToggle />
                </div>
                <div className="flex-1 p-4">
                  <Link className={`block pt-4 mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} href="/">
                    Home
                  </Link>
                  <Link className={`block pt-4 mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} href="/employees">
                    Employees
                  </Link>
                </div>
              </div>
              <div className="p-4">
                {isAuth ? (
                  <button
                    onClick={handleLogout}
                    className={`w-full px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link href="/login">
                      <button className={`w-full px-4 py-2 mb-2 rounded-md ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}>
                        Login
                      </button>
                    </Link>
                    <Link href="/signup">
                      <button className={`w-full px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}>
                        Signup
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
