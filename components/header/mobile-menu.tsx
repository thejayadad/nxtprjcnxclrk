'use client';

import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { UserButton } from '@clerk/clerk-react';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Menu Icon */}
      <div className="flex items-center justify-between p-3 rounded-full bg-gray-800 text-white">
        <button
          onClick={toggleMenu}
          className="text-2xl focus:outline-none transition"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          {/* Logo Section */}
          <div className="text-lg font-bold mb-6">YourLogo</div>

          {/* Navigation Links */}
          <nav className="space-y-4">
            <a href="#" className="block text-gray-300 hover:text-white">
              Home
            </a>
            <a href="#" className="block text-gray-300 hover:text-white">
              About
            </a>
            <a href="#" className="block text-gray-300 hover:text-white">
              Services
            </a>
            <a href="#" className="block text-gray-300 hover:text-white">
              Contact
            </a>
          </nav>
        </div>

        {/* User Button */}
        <div className="absolute bottom-4 left-4">
          <UserButton />
        </div>
      </div>

      {/* Background Overlay */}
      {/* {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={toggleMenu}
        ></div>
      )} */}
    </div>
  );
};

export default MobileMenu;
