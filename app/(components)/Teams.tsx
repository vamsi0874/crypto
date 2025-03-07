"use client";

import React from "react";

const teamMembers = [
  {
    name: "John Smith",
    role: "Designation here",
    description: `Lorem ipsum dolor sit amet consectetur. In justo rutrum sit 
    sit fermentum ut libero hendrerit id. Nulla eros amet netus sagittis 
    in nunc convallis mattis maecenas. Tempus leo sociosqu lorem ac sem 
    sagittis lacus mi mi sed nec nisi et purus sapien. Malesuada enim 
    mi gravida praesent sed suspendisse pretium.`,
  },
  {
    name: "Elina Williams",
    role: "Designation here",
    description: `Lorem ipsum dolor sit amet consectetur. In justo rutrum sit 
    sit fermentum ut libero hendrerit id. Nulla eros amet netus sagittis 
    in nunc convallis mattis maecenas. Tempus leo sociosqu lorem ac sem 
    sagittis lacus mi mi sed nec nisi et purus sapien. Malesuada enim 
    mi gravida praesent sed suspendisse pretium.`,
  },
  {
    name: "John Smith",
    role: "Designation here",
    description: `Lorem ipsum dolor sit amet consectetur. In justo rutrum sit 
    sit fermentum ut libero hendrerit id. Nulla eros amet netus sagittis 
    in nunc convallis mattis maecenas. Tempus leo sociosqu lorem ac sem 
    sagittis lacus mi mi sed nec nisi et purus sapien. Malesuada enim 
    mi gravida praesent sed suspendisse pretium.`,
  },
];

export default function Team() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Team</h2>

      <div className="space-y-4">
        {teamMembers.map((member, idx) => (
          <div key={idx} className="p-4 bg-gray-50 rounded-md shadow flex gap-4">
            {/* Replace with your icon path */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/194/194938.png"
              alt="Team Member Icon"
              className="w-16 h-16 object-contain"
            />
            <div>
              <p className="text-lg font-semibold">{member.name}</p>
              <p className="text-sm text-gray-500 mb-2">{member.role}</p>
              <p className="text-gray-700 leading-relaxed">{member.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
