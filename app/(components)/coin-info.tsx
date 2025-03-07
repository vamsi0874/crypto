"use client"

import React, { useContext, useEffect, useState } from "react";
import BitcoinChart from "./Coinchart";
import { Context } from "../(context)/context";
import api from "@/services";


export default function BitcoinInfo() {
 const {coin, coinData,allCoinsData} = useContext(Context);

console.log('allCoins',allCoinsData);
const [isHovering, setIsHovering] = useState(false);

const handleClick = () => {
  //  addCoin()
 try {
    api.post('/coins/add/', {
        title:`${coin.name}`,
        content:"good"
    })
 } catch (error) {
    console.error('Error adding coin:', error);
 }
}


  return (
    <div className="w-full p-6">
      <div className="flex items-center space-x-3">
        {/* <img src="/bitcoin-icon.png" alt="Bitcoin Logo" className="w-8 h-8" /> */}
        <h1 onClick={handleClick} className=" cursor-pointer text-2xl font-bold "
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        >{coin.name}</h1>
        {isHovering && (
            <span className="absolute top-20 text-gray-500 text-sm  px-2 py-1 rounded-md">
              (Add to Watchlist)
            </span>
          )}
        <span className="bg-gray-300 text-sm px-2 py-1 rounded-md">Rank #{allCoinsData.filterCoins[0]?.market_cap_rank}</span>
      </div>

      <div className="mt-4">
        <h2 className="text-4xl font-bold">${allCoinsData.filterCoins[0]?.current_price}</h2>
        <p className="text-gray-500">{coinData.inr? "₹"+coinData.inr:""}{allCoinsData.filterCoins[0].symbol}</p>

        <p className={`${allCoinsData.filterCoins[0]?.price_change_percentage_24h?.toFixed(2) > 0 ? "text-green-500" : "text-red-500"} font-semibold`}>{allCoinsData.filterCoins[0]?.price_change_percentage_24h?.toFixed(2)}% (24H)</p>
      </div>

      <div className="mt-6">
        {/* <h3 className="font-semibold">Bitcoin Price Chart (USD)</h3> */}
        {/* <div className="flex space-x-2 mt-2">
          {["1H", "24H", "7D", "1M", "3M", "6M", "1Y", "ALL"].map((range) => (
            <button key={range} className={`px-2 py-1 rounded-md ${range === "7D" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}>
              {range}
            </button>
          ))}
        </div> */}

        {/* Placeholder for the chart */}
        <div>
         <BitcoinChart/>
        </div>
      </div>
    </div>
  );
}
