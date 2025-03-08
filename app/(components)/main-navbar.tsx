"use client";


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SiWebmoney } from "react-icons/si";

const MainNavbar = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsAuthorized(!!token);
  }, []);

 
  const handleAuthClick = () => {
    if (isAuthorized) {
      localStorage.removeItem("access_token");
      setIsAuthorized(false);
      router.push("/");
    } else {
      router.push("/login");
    }
  };

 
  const handleWatchlistClick = () => {
    if (isAuthorized) {
      router.push("/watchlist");
    } else {
      router.push("/login");
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
     
        <div>
          <button
            onClick={() => router.push("/")}
            className="text-2xl font-bold text-blue-600"
          >
           <SiWebmoney />
           
          </button>
          <span className="text-sm font-medium text-gray-700">
            Cryptocurrency
          </span>
        </div>
      
        <div className="flex items-center gap-6">
          <button
            onClick={handleWatchlistClick}
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            WatchList
          </button>
          <button
            onClick={handleAuthClick}
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            {isAuthorized ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
