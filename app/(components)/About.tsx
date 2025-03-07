import { useContext } from "react";
import { Context } from "../(context)/context";

export default function About() {
    const {coinHData,allCoinsData:{filterCoins},coinData} = useContext(Context);
    return (
      <div className="w-full mx-auto p-6 bg-white">
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">About {filterCoins[0]?.name}</h2>
  
        {/* What is Bitcoin? Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">What is {filterCoins[0]?.name}?</h3>
                    <p className="text-gray-800">
                    {filterCoins[0]?.name}'s current price is 
            <span className="font-medium"> ${filterCoins[0]?.current_price}</span>, 
            with a <span className="font-medium">24-hour trading volume of $ {filterCoins[0]?.total_volume}</span>. 
            Over the past 24 hours, {filterCoins[0].symbol} has experienced a 
            <span className={filterCoins[0]?.price_change_percentage_24h < 0 ? "text-red-500" : "text-green-500"}>
                {filterCoins[0]?.price_change_percentage_24h}%
            </span> price change. It is currently 
            <span className="text-red-500"> {filterCoins[0]?.ath_change_percentage}%</span> below its all-time high of 
            <span className="font-medium"> $ {filterCoins[0]?.ath}</span>, recorded on 
            <span className="font-medium"> {new Date(filterCoins[0]?.ath_date).toLocaleDateString()}</span>, 
            and has increased <span className="text-green-500">{filterCoins[0]?.atl_change_percentage}%</span> from its all-time low of 
            <span className="font-medium"> $ {filterCoins[0]?.atl}</span>, recorded on 
            <span className="font-medium"> {new Date(filterCoins[0]?.atl_date).toLocaleDateString()}</span>. 
            The circulating supply stands at 
            <span className="font-medium"> {filterCoins[0]?.circulating_supply} BTC</span>, 
            with a maximum supply cap of 
            <span className="font-medium"> {filterCoins[0]?.max_supply} BTC</span>. 
            Bitcoin holds the 
            <span className="font-medium"> #{filterCoins[0]?.market_cap_rank} market cap rank</span>, 
            with a total market capitalization of 
            <span className="font-medium"> $ {filterCoins[0]?.market_cap}</span>.
    </p>

        </div>
  
        {/* Placeholder Content */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Lorem ipsum dolor sit amet</h3>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet consectetur. Aliquam placerat sit lobortis tristique 
            pharetra. Diam id et lectus urna et tellus aliquam dictum at. Viverra diam suspendisse 
            enim facilisi diam ut sed. Quam scelerisque fermentum sapien morbi sodales odio sed 
            rhoncus. Ultricies urna volutpat pendisse enim facilisi diam ut sed.
          </p>
          <p className="text-gray-600 mb-4">
            Diam praesent massa dapibus magna aliquam a dictumst volutpat. Egestas vitae pellentesque 
            auctor amet. Nunc sagittis libero adipiscing cursus felis pellentesque interdum. Odio 
            cursus phasellus velit in senectus enim dui. Turpis tristique placerat interdum sed 
            volutpat. Id imperdiet magna eget eros donec cursus nunc.
          </p>
          <p className="text-gray-600">
            Fermentum hendrerit imperdiet nulla viverra faucibus. Sit aliquam massa vel convallis 
            dui ac. Mi adipiscing semper scelerisque porttitor pulvinar nunc risus. Fermentum 
            potenti iaculis lacinia congue ipsum.
          </p>
        </div>
      </div>
    );
  }
  