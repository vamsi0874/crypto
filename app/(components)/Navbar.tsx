"use client";
import React from "react";

const NAV_ITEMS = [
  "Overview",
  "Fundamentals",
  "News Insights",
  "Sentiments",
  "Team",
  "Technicals",
  "Tokenomics",
];

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="border-b border-gray-300 mb-4">
      <ul className="flex space-x-6 px-4 text-sm font-medium text-gray-500">
        {NAV_ITEMS.map((item) => (
          <li
            key={item}
            className={`cursor-pointer py-3 hover:text-gray-700 transition-colors ${
              activeTab === item ? "text-black border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
