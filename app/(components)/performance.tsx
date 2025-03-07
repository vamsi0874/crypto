// "use client";

// import { useContext, useEffect, useState } from "react";
// import { Context } from "../(context)/context";



// const Performance: React.FC = () => {
  
//   const { coinHData, allCoinsData:{filterCoins}, coinData } = useContext(Context);

//     return (
//         <div className="p-5 bg-white shadow rounded-lg w-full">
//             <h2 className="text-lg font-semibold mb-4">Performance</h2>

//             {/* Today's Low to High */}
//             <div className="mb-4">
//                 <div className="flex justify-between text-gray-500 text-sm">
//                     <span>Today's Low</span>
                    
//                     <span>Today's High</span>
//                 </div>
//                 <div className="relative mt-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2 rounded">
//                     <div
//                         className="absolute top-1 text-xs font-semibold text-black"
//                         style={{
//                             left: `${
//                                 ((filterCoins[0]?.current_price - filterCoins[0]?.low_24h) /
//                                     (filterCoins[0]?.high_24h - filterCoins[0]?.low_24h)) *
//                                 100
//                             }%`,
//                         }}
//                     >
//                         ▲<div>{filterCoins[0]?.current_price} </div>
//                     </div>
//                 </div>
//                 <div className="flex justify-between mt-1 text-black font-medium">
//                     <span>${filterCoins[0]?.low_24h}</span>
//                     <span>${filterCoins[0]?.high_24h}</span>
                  
//                 </div>
//             </div>

//             {/* 52W Low to High */}
//             {/* <div>
//                 <div className="flex justify-between text-gray-500 text-sm">
//                     <span>52W Low</span>
//                     <span>52W High</span>
//                 </div>
//                 <div className="mt-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2 rounded"></div>
//                 <div className="flex justify-between mt-1 text-black font-medium">
//                     <span>${data.yearLow}</span>
//                     <span>${data.yearHigh}</span>
//                 </div>
//             </div> */}
//         </div>
//     );
// };

// export default Performance;
"use client";

import { useContext } from "react";
import { Context } from "../(context)/context";

const Performance: React.FC = () => {
  // Destructure filterCoins from context
  const {
    allCoinsData: { filterCoins },
  } = useContext(Context);

  // Get today's values from the first coin (ensure these exist)
  const currentPrice = filterCoins[0]?.current_price;
  const low24h = filterCoins[0]?.low_24h;
  const high24h = filterCoins[0]?.high_24h;

  // Calculate the percentage position of current price relative to low & high
  const positionPercent =
    (currentPrice &&
      low24h &&
      high24h &&
      ((currentPrice - low24h) / (high24h - low24h)) * 100) ||
    0;

  return (
    <div className="p-5 bg-white shadow rounded-lg w-full">
      <h2 className="text-lg font-semibold mb-4">Performance</h2>

      {/* Today's Low to High */}
      <div>
        <div className="relative bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2 rounded">
          {/* Arrow + Current Price */}
          <div
            className="absolute flex flex-col items-center text-xs font-semibold text-black"
            style={{
              top: "-1.5rem", // Move arrow & price above the bar
              left: `${positionPercent}%`,
              transform: "translateX(-50%)", // Center horizontally
            }}
          >
            
            <span className="mt-1 text-black">
              ${currentPrice?.toLocaleString()}

              {/* {positionPercent > 0 ? `(${positionPercent.toFixed(2)})%` : ""} */}

            </span>
            <span className="mt-3 text-black">▲</span>
          </div>
        </div>

        {/* Low & High */}
        <div className="flex justify-between mt-2 text-black font-medium">
          <span>${low24h?.toLocaleString()}</span>
          <span>${high24h?.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Performance;
