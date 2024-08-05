import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">Welcome to Techner's Employee Management System</h1>
        <p className="text-lg md:text-xl text-center mb-8">
          Manage your employees efficiently with Techner's Employee Management System. Keep track of employee records, manage their tasks, and improve overall productivity with our comprehensive tools.
        </p>
        <div className="flex justify-center">
          <Link href="/employees">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg md:text-xl hover:bg-blue-700 transition-colors">
              Go to Employees Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
