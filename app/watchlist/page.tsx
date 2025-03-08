"use client";
import { useEffect, useState } from "react";

import api from "@/services"; // Your Axios instance
import {  getTrendingCoins } from "../(lib)/actions/auth";
import Image from "next/image";
import { FaTrashAlt } from 'react-icons/fa'
import { useRouter } from "next/navigation";

interface TrendingCoin {
  item: {
    coin_id: number;
    name: string;
    symbol: string;
    market_cap_rank: number;
    price_btc: number;
    thumb: string;
    data?: {
      price?: number;
      sparkline?: string;
      market_cap?: number;
      price_change_percentage_24h?: {
        usd?: number;
      };
      total_volume?: number;
    };
  };
}

export default function Watchlist() {
  const [watchList, setWatchList] = useState<any[]>([]);
  const [finalCoins, setFinalCoins] = useState<TrendingCoin[]>([]);

const router = useRouter()
 const deleteCoin = async ({ id }: any) => {
  console.log('id', id);
  try {
    await api.delete(`/coins/delete/${id}/`);
    await fetchDbCoins(); // Fetch the updated watchlist
  } catch (error) {
    console.error("Error deleting coin:", error);
  }
};

    // 1) Fetch your saved watchlist from the backend
    const fetchDbCoins = async () => {
      try {
        const res = await api.get("http://127.0.0.1:8000/api/coins/add/");
        // Suppose each object is { title: "bitcoin", ... }
        console.log('res',res.data)
        const dbCoins: { id:number,title: string }[] = res.data;
        const coinTitles = dbCoins.map((coin) => 
          ({
            id:coin.id,
            title:coin.title.toLowerCase()

          })
      );
        setWatchList(coinTitles);
        console.log('coinTitles',coinTitles)
      } catch (error) {
        console.error("Error fetching DB coins:", error);
      }
    };

    // 2) Fetch trending coins from CoinGecko
    const fetchTrending = async () => {
      try {
        const data = await getTrendingCoins(); // your existing function
        const trendingCoins: TrendingCoin[] = data.coins;
        setFinalCoins(trendingCoins);
      } catch (error) {
        console.error("Error fetching trending coins:", error);
      }
    };

  useEffect(() => {

    fetchDbCoins();
    fetchTrending();
  }, []);

  // Filter finalCoins to only include those in watchList
  console.log('watch',watchList)

  const filteredCoins = finalCoins.filter((coin) =>{
    const Titles = watchList.map((coin)=>coin.title.toLowerCase())
    return Titles.includes(coin.item.name.toLowerCase())
  }
  ).map((coin)=>({
    id: watchList.find((item)=>item.title.toLowerCase()===coin.item.name.toLowerCase()).id,
    ...coin
  })) 

  console.log("filteredCoins", filteredCoins);

  return (
    <div className="w-full px-4 py-6">
      <div className="flex justify-between">
      <h1 className="text-2xl font-bold mb-4">Your Watchlist</h1>
      <span className="text-xl font-bold text-blue-600 cursor-pointer" onClick={()=>router.push('/')}>Add More</span>
      </div>
      <div className="overflow-x-auto bg-gray-900 rounded-lg shadow">
        <table className="w-full table-auto text-left text-sm text-gray-100">
          <thead className="bg-gray-800 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">24h</th>
              <th className="px-4 py-3">Market Cap</th>
              {/* <th className="px-4 py-3">Volume(24H)</th> */}
              <th className="px-4 py-3">Circulating Supply</th>
              <th className="px-4 py-3">Last 7 Days</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-3 text-center">
                  No coins found in your watchlist.
                </td>
              </tr>
            ) : (
              filteredCoins.map((coin, index) => {
                const {
                  
                  market_cap_rank,
                  name,
                  symbol,
                
                  thumb,
                  data,
                } = coin.item;
                const {id} = coin

                // Destructure safely with optional chaining
                const coinPrice = data?.price || 0;
                const sparkline = data?.sparkline || "";
                const coinMarketCap = data?.market_cap || 0;
                const dailyChange = data?.price_change_percentage_24h?.usd ?? 0;
                const volume24h = data?.total_volume ?? 0;

                // Format or fallback
                const rank = market_cap_rank || index + 1;
                const priceBtcStr = coinPrice
                  ? `${coinPrice.toFixed(6)} ${symbol}`
                  : "—";
                const dailyChangeStr = dailyChange
                  ? `${dailyChange.toFixed(2)}%`
                  : "—";
                const marketCapStr = coinMarketCap
                  ? `${coinMarketCap.toLocaleString()}`
                  : "—";
                const volumeStr = volume24h
                  ? `${volume24h.toLocaleString()}`
                  : "—";
                
                const last7DaysStr = sparkline ? <Image src={sparkline} width={60} height={60} alt="Bitcoin Logo" className="w-8 h-8" /> : "—";

                return (
                  <tr
                    key={id}
                    className="border-b border-gray-700 hover:bg-gray-800"
                  >
                    <td className="px-4 py-3">{rank}</td>
                    <td className="px-4 py-3 flex items-center gap-2">
                      {/* If you want a thumbnail image */}
                      <img
                        src={thumb}
                        alt={name}
                        className="w-5 h-5 rounded-full"
                      />
                      <span className="font-medium">{name}</span>
                      <span className="text-xs text-gray-400 uppercase">
                        {symbol}
                      </span>
                    </td>
                    <td className="px-4 py-3">{priceBtcStr}</td>
                    <td className="px-4 py-3 text-green-400">{dailyChangeStr}</td>
                    <td className="px-4 py-3">{marketCapStr}</td>
                    <td className="px-4 py-3">{volumeStr}</td>
                    <td className="px-4 py-3">{last7DaysStr}</td>
                    <td onClick={()=>deleteCoin({id})} className="px-4 py-3 cursor-pointer"><FaTrashAlt/> </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
