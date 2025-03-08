'use client'
import axios from "axios";
import React, { useEffect } from "react";
import Image from "next/image";
import api from "@/services";

interface CoinItem {
  name: string;
  symbol: string;
  market_cap_rank: number;
  price_change: number;
  sparkline: string;
}

interface Coin {
  item: {
    name: string;
    symbol: string;
    market_cap_rank: number;
    data: {
      price_change_percentage_24h: {
        usd: number;
      },
      sparkline: string;
    };
  };
}

export default function Sidebar() {

  const [trendingCoins, setTrendingCoins] = React.useState<CoinItem[]>([]);
 

  const apiUrl = 'https://api.coingecko.com/api/v3/search/trending';

  const handleClick = (name:string)=>{
  
   try {
      api.post('/api/coins/add/', {
          title:`${name}`,
          content:"good"
      })
      alert('Added to watchlist')
   } catch (error) {
      console.error('Error adding coin:', error);
   }
  }
  
  const fetchData = async () => {

    const response = await axios.get(apiUrl, {
      method: 'GET',
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": 'CG-uGcDEUyt3c53ghHwSHLGbo5p',
      },
    });
    const data = await response.data;
  


    const res: CoinItem[] = data.coins
      .sort((a: Coin, b: Coin) => a.item.market_cap_rank - b.item.market_cap_rank)
      .map((items: Coin) => {
        return {
          name: items.item.name,
          symbol: items.item.symbol,
          market_cap_rank: items.item.market_cap_rank,
          price_change: Math.floor(items.item.data.price_change_percentage_24h.usd * 100) / 100,
          sparkline: items.item.data.sparkline,
        };
      })
      

      setTrendingCoins(res);

  
  };

   useEffect(()=>{
    fetchData();
  }, [])

  return (
    <div className="w-1/3 p-6">
  


      <div className="mt-6">
        <h3 className="text-lg font-semibold">Trending Coins (24h)</h3>
  <ul className="w-full  text-sm">
     {trendingCoins.map((coin, index) => (
    <li
      key={index}
      className="grid grid-cols-[1.2fr_0.8fr_1fr] items-center gap-1 py-1 border-b border-gray-200"
    >
      <span onClick={()=>handleClick(coin.name)} className="cursor-pointer font-semibold whitespace-nowrap">{coin.name}</span>
      <span>
        <Image src={coin?.sparkline} width={60} height={60} alt="Bitcoin Logo" className="w-8 h-8" />
      </span>
      <span className={`text-right ${coin.price_change > 0 ? 'text-green-500' : 'text-red-500'}`}>
        {coin.price_change}%
      </span>
      
    </li>
  ))}
</ul>


      </div>
    </div>
  );
}
