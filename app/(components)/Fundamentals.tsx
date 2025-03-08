import { useContext } from "react";
import { Context } from "../(context)/context";

export default function Fundamentals() {
    
    const {  allCoinsData:{filterCoins} } = useContext(Context);

    const fundamentals = [
      { label: `${filterCoins[0]?.name} Price`, value: filterCoins[0]?.current_price },
      { label: "24h Low / 24h High", value: filterCoins[0]?.low_24h + " / " + filterCoins[0]?.high_24h },
    //   { label: "7d Low / 7d High", value: "$16,382.07 / $16,874.12" },
      { label: "Trading Volume", value: filterCoins[0]?.total_volume },
      { label: "Market Cap Rank", value: '#'+filterCoins[0]?.market_cap_rank },
    ];

    const currentPrice = filterCoins[0]?.current_price || 0;
    const ath = filterCoins[0]?.ath || 0;
    const atl = filterCoins[0]?.atl || 0;
  
    
    const athChange = ((currentPrice - ath) / ath) * 100;
    const atlChange = ((currentPrice - atl) / atl) * 100;
  
    const marketData = [
      { label: "Market Cap", value: filterCoins[0]?.market_cap },
    //   { label: "Market Cap Dominance", value: filterCoins[0]?.market_cap_dominance },
    //   { label: "Volume / Market Cap", value: "0.0718" },
    { label: "All-Time High", value: `$${ath}`, extra: `${athChange.toFixed(1)}%`, extraClass: athChange < 0 ? "text-red-500" : "text-green-500" },
    { label: "All-Time Low", value: `$${atl}`, extra: `${atlChange.toFixed(1)}%`, extraClass: atlChange < 0 ? "text-red-500" : "text-green-500" },

    ];


  
    return (
      <div className="w-full mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Fundamentals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
          <div>
            {fundamentals.map((item) => (
              <div key={item.label} className="flex justify-between py-2 border-b last:border-none">
                <span className="text-gray-500">{item.label}</span>
                <span className="font-medium text-gray-700">{item.value}</span>
              </div>
            ))}
          </div>
  
          <div>
            {marketData.map((item) => (
              <div key={item.label} className="flex justify-between py-2 border-b last:border-none">
                <span className="text-gray-500">{item.label}</span>
                <span className="font-medium text-gray-700">
                  {item.value}{" "}
                  {item.extra && <span className={`ml-2 ${item.extraClass}`}>{item.extra}</span>}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  