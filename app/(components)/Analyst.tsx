"use client";

import React from "react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

export default function AnalystEstimates() {
  // Example percentages
  const buy = 76;
  const hold = 8;
  const sell = 16;

  // Data for the radial chart (just one data point for the 'Buy' ring)
  const radialData = [
    { name: "Buy", value: buy, fill: "#34D399" }, // Green
  ];

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
      {/* Header */}
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-semibold">Analyst Estimates</h3>
        <span className="ml-2 text-gray-400 text-sm"> {/* Info Icon if needed */}</span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* 1) Radial Progress Chart */}
        <div className="relative">
          {/* Chart Container */}
          <div className="w-28 h-28">
            <ResponsiveContainer>
              <RadialBarChart
                data={radialData}
                innerRadius="70%"
                outerRadius="100%"
                barSize={10}
                startAngle={90}
                endAngle={-270}  // 360° in reverse to fill from top
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  angleAxisId={0}
                  tick={false}    // Hide ticks
                />
                <RadialBar
                //   minAngle={15}  // Minimum angle for non-zero values
                //   clockWise
                  dataKey="value"
                  cornerRadius={10}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>

          {/* Center Label */}
          <div className="absolute top-0 left-0 w-28 h-28 flex items-center justify-center pointer-events-none">
            <span className="text-xl font-bold">{buy}%</span>
          </div>
        </div>

        {/* 2) Horizontal Bars for Buy, Hold, Sell */}
        <div className="space-y-2 w-full max-w-xs">
          {/* Buy */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Buy</span>
            <div className="flex-1 mx-2 h-2 bg-gray-200 rounded">
              <div
                className="h-2 bg-green-500 rounded"
                style={{ width: `${buy}%` }}
              />
            </div>
            <span className="text-gray-700">{buy}%</span>
          </div>

          {/* Hold */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Hold</span>
            <div className="flex-1 mx-2 h-2 bg-gray-200 rounded">
              <div
                className="h-2 bg-gray-400 rounded"
                style={{ width: `${hold}%` }}
              />
            </div>
            <span className="text-gray-700">{hold}%</span>
          </div>

          {/* Sell */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Sell</span>
            <div className="flex-1 mx-2 h-2 bg-gray-200 rounded">
              <div
                className="h-2 bg-red-500 rounded"
                style={{ width: `${sell}%` }}
              />
            </div>
            <span className="text-gray-700">{sell}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
