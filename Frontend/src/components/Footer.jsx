import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo or Brand Name */}
          <div className="mb-4 md:mb-0">
            <h1 className="font-bold tracking-wide">Word<span className="text-3xl text-green-500">To</span>PDF</h1>
          </div>
          {/* Navigation Links */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="text-gray-400 hover:text-white transition">
              Home
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              About
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              Services
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              Contact
            </a>
          </div>
          {/* Social Icons */}
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
        {/* Divider */}
        <hr className="border-gray-600 my-4" />
        {/* Copyright Section */}
        <div className="text-center text-sm text-gray-500">
          Copyright © 2024 - All rights reserved by Word<span className="text-xl text-green-500">To</span>PDF
        </div>
      </div>
    </footer>
  );
}

export default Footer;
