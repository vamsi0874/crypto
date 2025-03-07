"use client";

import { useEffect } from "react";

declare global {
    interface Window {
        TradingView: any;
    }
}

const TradingViewChart: React.FC = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/tv.js";
        script.async = true;

        script.onload = () => {
            if (window.TradingView) {
                new window.TradingView.widget({
                    width: "100%",
                    height: 350,
                    symbol: "BINANCE:BTCUSDT",
                    interval: "D",
                    timezone: "Etc/UTC",
                    theme: "light",
                    style: "1",
                    locale: "en",
                    toolbar_bg: "#f1f3f6",
                    hide_side_toolbar: true, // Hide side toolbar
                    enable_publishing: false,
                    allow_symbol_change: false, // Disable symbol change
                    container_id: "tradingview_btcusd",
                });
            }
        };

        document.body.appendChild(script);
    }, []);

    return (
        <div className="p-4 border rounded-2xl shadow-lg bg-white w-full max-w-4xl">
            <h2 className="text-xl font-semibold mb-2">Bitcoin Price Chart (USD)</h2>
            <div id="tradingview_btcusd" className="rounded-lg overflow-hidden"></div>
        </div>
    );
};


export default TradingViewChart;
