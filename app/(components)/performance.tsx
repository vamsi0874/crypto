
"use client";

import { useContext } from "react";
import { Context } from "../(context)/context";

const Performance: React.FC = () => {
 
  const {
    allCoinsData: { filterCoins },
  } = useContext(Context);

  
  const currentPrice = filterCoins[0]?.current_price;
  const low24h = filterCoins[0]?.low_24h;
  const high24h = filterCoins[0]?.high_24h;

  
  const positionPercent =
    (currentPrice &&
      low24h &&
      high24h &&
      ((currentPrice - low24h) / (high24h - low24h)) * 100) ||
    0;

  return (
    <div className="p-5 bg-white shadow rounded-lg w-full">
      <h2 className="text-lg font-semibold mb-4">Performance</h2>

      <div>
        <div className="relative bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2 rounded">
        
          <div
            className="absolute flex flex-col items-center text-xs font-semibold text-black"
            style={{
              top: "-1.5rem", 
              left: `${positionPercent}%`,
              transform: "translateX(-50%)", 
            }}
          >
            
            <span className="mt-1 text-black">
              ${currentPrice?.toLocaleString()}

              {/* {positionPercent > 0 ? `(${positionPercent.toFixed(2)})%` : ""} */}

            </span>
            <span className="mt-3 text-black">▲</span>
          </div>
        </div>

     
        <div className="flex justify-between mt-2 text-black font-medium">
          <span>${low24h?.toLocaleString()}</span>
          <span>${high24h?.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Performance;
