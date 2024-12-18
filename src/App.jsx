import React, { useState, useEffect } from "react";
import ayyazImg from "/src/assets/ayyaz.png";
import daniImg from "/src/assets/dani.png";

const App = () => {
  const [coinData, setCoinData] = useState(null);
  const [previousPrice, setPreviousPrice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = "https://api.coincap.io/v2/assets/jupiter";
    const interval = 15000;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const { data } = await response.json();
        setCoinData(data);

        if (previousPrice && previousPrice !== data.priceUsd) {
          console.log("Price has changed:", data.priceUsd);
        }
        setPreviousPrice(data.priceUsd);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, interval);

    return () => clearInterval(intervalId);
  }, [previousPrice]);

  if (error) return <p>Error: {error}</p>;
  if (!coinData)
    return (
      <p className="text-center text-lg dark:text-white">Loading Data...</p>
    );

  const { name, symbol, priceUsd, changePercent24Hr } = coinData;
  const AYYAZBUYING = 447.5;
  const DANIBUYING = 80.1;
  const AVGCOST = 1.06;

  return (
    <div className="max-w-[90%] mx-auto">
      <div className="flex">
        <div className="ml-auto  overflow-x-auto">
          <h1 className="text-gray-900 dark:text-white py-2">
            {name} ({symbol})
          </h1>

          <table className="table-auto">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Price (USD)
                </th>
                <th className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  24Hr Change
                </th>
              </tr>
            </thead>
            <tr>
              <td class="text-gray-900 dark:text-white px-6 py-4">
                ${parseFloat(priceUsd).toFixed(2)}
              </td>
              <td
                class={`px-6 py-4 ${
                  changePercent24Hr.includes("-")
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {parseFloat(changePercent24Hr).toFixed(2)}%
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div className="personlized-data flex-col">
        <div className="ayyaz-data flex items-center border border-gray-500 rounded-md p-4 mb-2">
          <div className="p-2">
            <img
              src={ayyazImg}
              alt=""
              className="image rounded-full"
              width={80}
            />
            <h2 className="text-sm md:text-lg lg:text-xl font-bold leading-none text-gray-900 dark:text-white">
              Ayyaz 🤑
            </h2>
            <span
              className={` text-sm ${
                priceUsd < AVGCOST ? "text-red-500" : "text-green-500"
              }`}
            >
              ${priceUsd < AVGCOST ? "" : "+"}
              {parseFloat(
                AYYAZBUYING * priceUsd - AYYAZBUYING * AVGCOST
              ).toFixed(2)}
            </span>
          </div>
          <div className="ml-auto overflow-x-auto">
            {/* <p className="text-xl font-bold text-gray-900 dark:text-white ml-auto">
              ${parseFloat(ayyazCoins * priceUsd).toFixed(3)}
            </p> */}
            <table className="table-auto">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    JUP
                  </th>
                  <th className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Buying
                  </th>
                  <th className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Profit
                  </th>
                  <th className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Total Profit
                  </th>
                </tr>
              </thead>
              <tr>
                <td class="text-gray-900 dark:text-white px-6 py-4">
                  {AYYAZBUYING.toFixed(2)}
                </td>
                <td className="text-gray-900 dark:text-white px-6 py-4">
                  ${parseFloat(AYYAZBUYING * AVGCOST).toFixed(2)}
                </td>
                {/* Profit */}
                <td
                  className={`px-6 py-4 ${
                    priceUsd < AVGCOST ? "text-red-500" : "text-green-500"
                  }`}
                >
                  ${priceUsd < AVGCOST ? "" : "+"}
                  {parseFloat(
                    AYYAZBUYING * priceUsd - AYYAZBUYING * AVGCOST
                  ).toFixed(2)}
                </td>
                {/* Total Profit */}
                <td
                  className={`px-6 py-4 ${
                    priceUsd < AVGCOST ? "text-red-500" : "text-green-500"
                  }`}
                >
                  ${parseFloat(AYYAZBUYING * priceUsd).toFixed(2)}
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className="dani-data flex items-center border border-gray-500 rounded-md p-4 mb-2">
          <div className="p-2">
            <img
              src={daniImg}
              alt=""
              className="image rounded-full"
              width={80}
            />
            <h2 className="text-sm md:text-lg lg:text-xl font-bold leading-none text-gray-900 dark:text-white">
              Danial 🤑
            </h2>
            <span
              className={` text-sm ${
                priceUsd < AVGCOST ? "text-red-500" : "text-green-500"
              }`}
            >
              ${priceUsd < AVGCOST ? "" : "+"}
              {parseFloat(DANIBUYING * priceUsd - DANIBUYING * AVGCOST).toFixed(
                2
              )}
            </span>
          </div>
          <div className="ml-auto overflow-x-auto">
            {/* <p className="text-xl font-bold text-gray-900 dark:text-white ml-auto">
              ${parseFloat(ayyazCoins * priceUsd).toFixed(3)}
            </p> */}
            <table className="table-auto">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    JUP
                  </th>
                  <th className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Buying
                  </th>
                  <th className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Profit
                  </th>
                  <th className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Total Profit
                  </th>
                </tr>
              </thead>
              <tr>
                <td class="text-gray-900 dark:text-white px-6 py-4">
                  {DANIBUYING.toFixed(2)}
                </td>
                <td className="text-gray-900 dark:text-white px-6 py-4">
                  ${parseFloat(DANIBUYING * AVGCOST).toFixed(2)}
                </td>
                {/* Profit */}
                <td
                  className={`px-6 py-4 ${
                    priceUsd < AVGCOST ? "text-red-500" : "text-green-500"
                  }`}
                >
                  ${priceUsd < AVGCOST ? "" : "+"}
                  {parseFloat(
                    DANIBUYING * priceUsd - DANIBUYING * AVGCOST
                  ).toFixed(2)}
                </td>
                {/* Total Profit */}
                <td
                  className={`px-6 py-4 ${
                    priceUsd < AVGCOST ? "text-red-500" : "text-green-500"
                  }`}
                >
                  ${parseFloat(DANIBUYING * priceUsd).toFixed(2)}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
