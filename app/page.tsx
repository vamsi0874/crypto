"use client";
import React, { useEffect, useState } from "react";
import BitcoinInfo from "./(components)/coin-info";
import Navbar from "./(components)/Navbar";
import Sidebar from "./(components)/Sidebar";
import Performance from "./(components)/performance";
import Fundamentals from "./(components)/Fundamentals";
import Sentiment from "./(components)/Sentiment";
import AnalystEstimates from "./(components)/Analyst";
import About from "./(components)/About";
import Tokenomics from "./(components)/Tokenomics";
import AlreadyHoldingBitcoin from "./(components)/Calculations";
import Team from "./(components)/Teams";
import MainNavbar from "./(components)/main-navbar";




const App = () => {
  // Manage active tab here
  const [activeTab, setActiveTab] = useState("Overview");

  // Render content based on activeTab

  
  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <>
            {/* <BitcoinInfo /> */}
            <Performance />
            <Fundamentals />
            <Sentiment />
            <AnalystEstimates />
            <About />
            <Tokenomics />
            <AlreadyHoldingBitcoin />
            <Team />
          </>
        );
      case "Fundamentals":
        return <Fundamentals />;
      case "News Insights":
        return <About />;
      case "Sentiments":
        return <Sentiment />;
      case "Team":
        return <Team />;
      case "Technicals":
        return <Performance />;
      case "Tokenomics":
        return <Tokenomics />;
      default:
        return null;
    }
  };

  

  return (
    <div>   
      <MainNavbar/>
    <div className="flex flex-row gap-6 p-6">
      {/* Main Content */}
      
      
        
      {/* <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>login()}>github login</button>
        <button onClick={()=>logout()}>logout</button>
     

      </div> */}
      
      <div className="w-3/4 space-y-6">
      
        {/* Pass activeTab state and setter to Navbar */}
        <BitcoinInfo/>
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderContent()}
      </div>
      {/* Sidebar */}
      <Sidebar />
  
    </div>
    </div>
  );
};

export default App;

