"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import Link from "next/link";
import { loadUser, logout } from "@/redux/slices/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isAuth } = useSelector((state) => state.auth);

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
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 backdrop-blur-xs bg-opacity-70 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link className="text-xl list font-bold text-gray-900 dark:text-white" href="/">
              Logo
            </Link>
          </div>
          <div className="hidden md:flex md:space-x-8 md:items-center">
            <Link className="text-gray-900 dark:text-white" href="/">
              Home
            </Link>
            <Link className="text-gray-900 dark:text-white" href="/employees">
              Employees
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isAuth ? (
              <>
                <span className="text-gray-900 dark:text-white">{user?.email}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-900 dark:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-900 dark:text-white">
                    Login
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-900 dark:text-white">
                    Signup
                  </button>
                </Link>
              </>
            )}
            <ModeToggle />
          </div>
          <div className="md:hidden">
            <button onClick={toggleDrawer} className="text-gray-900 dark:text-white">
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
            className="relative bg-white dark:bg-gray-800 w-64 h-full shadow-lg"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4">
                <span className="text-gray-900 dark:text-white">{user?.email}</span>
                <button onClick={toggleDrawer} className="text-gray-900 dark:text-white">
                  <XIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="flex items-center flex-col h-screen">
                <div className="p-4">
                  <ModeToggle />
                </div>
                <div className="flex-1 p-4">
                  <Link className="block text-gray-900 pt-4 dark:text-white mb-2" href="/">
                    Home
                  </Link>
                  <Link className="block text-gray-900 pt-4 dark:text-white mb-2" href="/employees">
                    Employees
                  </Link>
                </div>
              </div>
              <div className="p-4">
                {isAuth ? (
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-900 dark:text-white"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link href="/login">
                      <button className="w-full px-4 py-2 mb-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-900 dark:text-white">
                        Login
                      </button>
                    </Link>
                    <Link href="/signup">
                      <button className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-900 dark:text-white">
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
