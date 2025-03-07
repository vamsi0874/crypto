// "use client";

// import { useState, useEffect } from "react";

// interface BitcoinData {
//     usd: number;
//     inr: number;
//     usd_24h_change: number;
// }

// const BitcoinPrice: React.FC = () => {
//     const [priceData, setPriceData] = useState<BitcoinData | null>(null);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchBitcoinData = async () => {
//             try {
//                 const response = await fetch(
//                     "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,inr&include_24hr_change=true"
//                 );
//                 const data = await response.json();
//                 // console.log('dsata',data);
//                 setPriceData(data.bitcoin);
//             } catch (err) {
//                 setError("Failed to fetch Bitcoin data.");
//             }
//         };

//         fetchBitcoinData();
//     }, []);

//     return (
//         <div className="p-4 border rounded shadow-md bg-white w-full max-w-md">
//             <h2 className="text-xl font-bold">Bitcoin Price</h2>
//             {error ? (
//                 <p className="text-red-500">{error}</p>
//             ) : priceData ? (
//                 <div>
//                     <p>USD: ${priceData.usd.toLocaleString()}</p>
//                     <p>INR: ₹{priceData.inr.toLocaleString()}</p>
//                     <p className={priceData.usd_24h_change < 0 ? "text-red-500" : "text-green-500"}>
//                         24H Change: {priceData.usd_24h_change.toFixed(2)}%
//                     </p>
//                 </div>
//             ) : (
//                 <p>Loading...</p>
//             )}
//         </div>
//     );
// };

// export default BitcoinPrice;
