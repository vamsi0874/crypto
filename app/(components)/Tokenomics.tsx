"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Crowdsale investors", value: 80 },
  { name: "Foundation", value: 20 },
];

const COLORS = ["#4F46E5", "#F59E0B"]; 
export default function Tokenomics() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Tokenomics</h2>
      <h3 className="text-xl font-medium mb-2">Initial Distribution</h3>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        
        <div className="w-full md:w-1/2" style={{ height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

       
        <div className="w-full md:w-1/2">
          <p className="text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Cras aliquet tristique ornare
            vestibulum nunc dignissim vel consequat. Leo etiam maecenas bibendum amet
            enim sit eget leo amet. At metus orci augue fusce eleifend lectus eu fusce
            adipiscing. Volutpat ultrices nibh sodales massa habitasse urna felis
            augue. Gravida aliquam fermentum augue eu. Imperdiet bibendum amet aliquam
            donec. Eget justo dui molestie odio rutrum. Vel ipsum eget in at curabitur
            sem posuere facilisis vitae. Sed lorem sit mauris in eget arcu ut.
            Vulputate ipsum aliquet odio nisi eu ac risus.
          </p>
        </div>
      </div>
    </div>
  );
}
