"use client";
import React, { useContext } from "react";
import { Context } from "../(context)/context";
// If you're using Next.js, you can import Image from "next/image" for optimization
// import Image from "next/image";

export default function AlreadyHoldingBitcoin() {

    const {allCoinsData} = useContext(Context);
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Already Holding {allCoinsData.filterCoins[0]?.name}?</h2>

      {/* Cards Row */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Profits Card */}
        <div className="flex-1 p-4 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-white shadow flex flex-col">
          {/* Replace with your image */}
          {/* 
          <Image
            src="/images/profits.png"
            alt="Calculate Profits"
            width={80}
            height={80}
            className="mb-2 rounded"
          /> 
          */}
          <h3 className="text-lg font-bold mb-1">Calculate your Profits</h3>
          <p className="text-sm mb-3">
            Check how much profit you can make with your {allCoinsData.filterCoins[0]?.name} holdings.
          </p>
          <button className="bg-white text-black px-3 py-1 rounded-md font-semibold w-fit">
            Check Now &rarr;
          </button>
        </div>

        {/* Tax Liability Card */}
        <div className="flex-1 p-4 rounded-lg bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow flex flex-col">
          {/* Replace with your image */}
          {/* 
          <Image
            src="/images/tax.png"
            alt="Calculate Tax Liability"
            width={80}
            height={80}
            className="mb-2 rounded"
          />
          */}
          <h3 className="text-lg font-bold mb-1">Calculate your tax liability</h3>
          <p className="text-sm mb-3">
            Easily figure out how much tax you owe on your {allCoinsData.filterCoins[0]?.name} gains.
          </p>
          <button className="bg-white text-black px-3 py-1 rounded-md font-semibold w-fit">
            Check Now &rarr;
          </button>
        </div>
      </div>

      {/* Descriptive Text */}
      <p className="mt-4 text-gray-700 leading-relaxed">
        Fermentum hendrerit imperdiet nulla viverra faucibus. Sit aliquam massa vel
        convallis dui ac. Mi adipiscing semper scelerisque porttitor pulvinar nunc
        risus. Fermentum potenti iaculis lacinia congue ipsum fames amet dui. Purus
        ultrices tincidunt volutpat in eget. Ullamcorper dui.
      </p>
    </div>
  );
}
