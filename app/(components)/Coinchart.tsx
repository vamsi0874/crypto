"use client";
import React, {  useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Context } from "../(context)/context";
import SpinningIcon from "./Loading";

interface Coin {
    name: string;
    id:string;
}

const BitcoinChart = () => {
  const { coinHData, allCoinsData, setCoin, coin } = useContext(Context);

  console.log('coinHData',coinHData)

  // Handler to update the selected coin's name
  const handleCoinChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCoin((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleDaysChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCoin((prev) => ({ ...prev, days: Number(e.target.value) }));
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">
        {coin.name} Price Chart (USD)
      </h3>

      {/* Dropdown Selectors */}
      <div className="flex items-center space-x-4 mb-4">
        {/* Range Selector */}
        <div>
          <label className="mr-2 font-medium">Select Range:</label>
          <select
            value={coin.days}
            onChange={handleDaysChange}
            className="p-2 border rounded"
          >
            <option value="1">1 Day</option>
            <option value="7">7 Days</option>
            <option value="30">1 Month</option>
            <option value="90">3 Months</option>
            <option value="365">1 Year</option>
          </select>
        </div>

        {/* Coin Selector */}
        <div>
          <label className="mr-2 font-medium">Select Coin:</label>
          <select
            value={coin.name}
            onChange={handleCoinChange}
            className="p-2 border rounded"
          >
            {allCoinsData?.allCoins?.map((coinItem: Coin) => (
              <option key={coinItem.id} value={coinItem.name}>
                {coinItem.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Line Chart */}
      {
        coinHData.length > 0 ? 
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={coinHData}>
          <XAxis dataKey="date" stroke="#8884d8" />
          <YAxis
            stroke="#8884d8"
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            domain={["auto", "auto"]}
            tickCount={6}
            interval="preserveStartEnd"
          />
          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
          <CartesianGrid strokeDasharray="3 3" />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#007bff"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer> : <SpinningIcon/>
      }
    </div>
  );
};

export default BitcoinChart;
