import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

function Navbar({ toggleDarkMode, isDarkMode }) {
  return (
    <nav
      className={`fixed top-0 w-full shadow-md z-50 transition duration-300 ${
        isDarkMode
          ? "bg-green-700 text-white"
          : "bg-green-100 text-gray-800"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto container px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold tracking-tight cursor-pointer hover:scale-105 transition duration-300">
          Word<span className="text-green-500">To</span>PDF
        </h1>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="flex items-center gap-2 bg-green-300 dark:bg-green-800 px-4 py-2 rounded-full shadow hover:shadow-lg transform hover:scale-105 transition duration-300"
        >
          {isDarkMode ? (
            <>
              <FaSun className="text-yellow-400" />
              <span className="font-medium">Light</span>
            </>
          ) : (
            <>
              <FaMoon className="text-blue-500" />
              <span className="font-medium">Dark</span>
            </>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
