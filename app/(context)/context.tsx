// "use client";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useState, createContext, useMemo } from "react";
// import SpinningIcon from "../(components)/Loading";

// interface Coin {
//     name: string;
//     currency: string;
//     days: number;
//   }

// interface ContextProps {
//   allCoinsData: any;
//   coinData: any;
//   coinHData: any[];
//   coin: Coin;

// setCoin : React.Dispatch<React.SetStateAction<Coin>>;
// }


// export const Context = createContext<ContextProps>({
//     allCoinsData:[],
//      coinData:{},
//     coinHData: [],
//   coin: { name: "Bitcoin", currency: "usd", days: 7 },
//   setCoin: ()=>{}
  
// });

// export const ContextProvider = ({ children }: { children: React.ReactNode }) => {

//     const options = {
//         headers: {
//          Method: "GET",
//           accept: "application/json",
//           "x-cg-demo-api-key":"	CG-XUueKMYw6Aik5suaX1YauHzc",
//         },
//     }
//   const [coin, setCoin] = useState<Coin>({
//     name: "bitcoin", // Lowercase for API compatibility
//     currency: "usd",
//     days: 7,
//   });

//   // Fetch function
//   const fetchHistoryData = async () => {
//     const response = await axios.get(
//       `https://api.coingecko.com/api/v3/coins/${coin.name.toLowerCase()}/market_chart?vs_currency=${coin.currency}&days=${coin.days}&interval=daily`, options
//     );
//     return response.data.prices.map((item: any) => ({
//       date: new Date(item[0]).toLocaleDateString("en-US", {
//         month: "short",
//         day: "2-digit",
//       }),
//       price: item[1],
//     }));
//   };
//   const fetchData = async () => {

//     const response = await axios.get(
//       `https://api.coingecko.com/api/v3/simple/price?ids=${coin.name}&vs_currencies=usd,inr&include_24hr_change=true`, options
//     );
//     return response.data[coin.name];
//   };
//   const fetchAllCoinsData = async () => {
//     const response = await axios.get(
//       `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`, options
//     );
//     console.log('response',response.data)
//     return { 
//         allCoins : response.data,
//         filterCoins: response.data.filter((Coin:any)=>Coin.name.toLowerCase()===coin.name.toLowerCase())};
//   };

//   // Fetch data using React Query
//   const { data: coinHData = [] } = useQuery({
//     queryKey: ["coinHData", coin.name, coin.currency, coin.days], // Include dependencies
//     queryFn: fetchHistoryData,
//     refetchInterval: 1000 * 60 * 5,
//   });

//   const { data: coinData={}, isLoading: isLoadingData } = useQuery({
//     queryKey: ["coinData", coin.name, coin.currency, coin.days], // Include dependencies
//     queryFn: fetchData,
//     refetchInterval: 1000 * 60 * 5,
//   });

 

//   const { data: allCoinsData=[], isLoading: isLoadingAllCoinsData } = useQuery({
//     queryKey: ["AllCoinsData", coin.name, coin.currency, coin.days], // Include dependencies
//     queryFn: fetchAllCoinsData,
//     refetchInterval: 1000 * 60 * 5,
//   });
    
//   // Memoize the context value to prevent unnecessary re-renders
//   const contextValue = useMemo(() => ({ allCoinsData,coinHData, coin, setCoin,coinData }), [coinHData, coin,coinData,allCoinsData]);

//   return (
//     <Context.Provider value={contextValue}>
//       { isLoadingData ? <SpinningIcon/> : isLoadingAllCoinsData ? <SpinningIcon/> : children}
//     </Context.Provider>
//   );
// };


"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, createContext, useMemo } from "react";
import SpinningIcon from "../(components)/Loading";

interface Coin {
    name: string;
    currency: string;
    days: number;
  }

  interface filterCoinData {

    current_price: number;
    symbol: string;
    price_change_percentage_24h: number;
    market_cap_rank: number;
    ath_change_percentage: number;
    ath: number;
    ath_date: string;
    atl_change_percentage: number;
    atl: number;
    atl_date: string;
    circulating_supply: number;
    max_supply: number;
    name: string;
    total_volume: number;
    market_cap: number;
    low_24h: number;
    high_24h: number;
  }

  interface allCoinsData {
    allCoins: [];
    filterCoins: filterCoinData[];
  }

interface coinHData {
    date: string;
    price: number;

}
  interface coinData {
    inr?: string;
  }

interface ContextProps {
  allCoinsData: allCoinsData;
  coinData: coinData;
  coinHData: coinHData[];
  coin: Coin;

setCoin : React.Dispatch<React.SetStateAction<Coin>>;
}


export const Context = createContext<ContextProps>({
    allCoinsData:{allCoins:[],filterCoins:[]},
     coinData:{},
    coinHData: [],
  coin: { name: "Bitcoin", currency: "usd", days: 7 },
  setCoin: ()=>{}
  
});

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {

    const options = {
        headers: {
         Method: "GET",
          accept: "application/json",
          "x-cg-demo-api-key":"	CG-XUueKMYw6Aik5suaX1YauHzc",
        },
    }
  const [coin, setCoin] = useState<Coin>({
    name: "bitcoin", // Lowercase for API compatibility
    currency: "usd",
    days: 7,
  });

  // Fetch function
  const fetchHistoryData = async () => {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coin.name.toLowerCase()}/market_chart?vs_currency=${coin.currency}&days=${coin.days}&interval=daily`, options
    );
    console.log('response',response.data)
    return response.data.prices.map((item: [number,number]) => ({
      date: new Date(item[0]).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      }),
      price: item[1],
    }));
  };
  const fetchData = async () => {

    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coin.name}&vs_currencies=usd,inr&include_24hr_change=true`, options
    );
    return response.data[coin.name];
  };
  const fetchAllCoinsData = async () => {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`, options
    );
    console.log('response',response.data)
    return { 
        allCoins : response.data,
        filterCoins: response.data.filter((Coin:{name:string})=>Coin.name.toLowerCase()===coin.name.toLowerCase())};
  };

  // Fetch data using React Query
  const { data: coinHData = [] } = useQuery({
    queryKey: ["coinHData", coin.name, coin.currency, coin.days], // Include dependencies
    queryFn: fetchHistoryData,
    refetchInterval: 1000 * 60 * 5,
  });

  const { data: coinData={}, isLoading: isLoadingData } = useQuery({
    queryKey: ["coinData", coin.name, coin.currency, coin.days], // Include dependencies
    queryFn: fetchData,
    refetchInterval: 1000 * 60 * 5,
  });

 

  const { data: allCoinsData ={allCoins:[],filterCoins:[]}, isLoading: isLoadingAllCoinsData } = useQuery({
    queryKey: ["AllCoinsData", coin.name, coin.currency, coin.days], // Include dependencies
    queryFn: fetchAllCoinsData,
    refetchInterval: 1000 * 60 * 5,
  });
    
  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ allCoinsData,coinHData, coin, setCoin,coinData }), [coinHData, coin,coinData,allCoinsData]);

  return (
    <Context.Provider value={contextValue}>
      { isLoadingData ? <SpinningIcon/> : isLoadingAllCoinsData ? <SpinningIcon/> : children}
    </Context.Provider>
  );
};
