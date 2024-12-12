import React, { useState, useEffect } from "react";
import ayyazImg from "/src/assets/ayyaz.png";
import daniImg from "/src/assets/dani.png";

const App = () => {
  const [coinData, setCoinData] = useState(null);
  const [previousPrice, setPreviousPrice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = "https://api.coincap.io/v2/assets/jupiter";
    const interval = 5000; // Poll every 5 seconds

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const { data } = await response.json();
        setCoinData(data);

        // Compare price to check if it's changed
        if (previousPrice && previousPrice !== data.priceUsd) {
          console.log("Price has changed:", data.priceUsd);
        }
        setPreviousPrice(data.priceUsd); // Store current price
      } catch (err) {
        setError(err.message);
      }
    };

    // Fetch data initially and set an interval
    fetchData();
    const intervalId = setInterval(fetchData, interval);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [previousPrice]); // Adding previousPrice to trigger re-fetch on price change

  if (error) return <p>Error: {error}</p>;
  if (!coinData) return <p>Loading...</p>;

  const { name, symbol, priceUsd, changePercent24Hr } = coinData;
  const ayyazCoins = 447.5;
  const daniCoins = 80.1;

  return (
    <div className="max-w-[80%] mx-auto">
      <div className="flex">
        <div className="ml-auto">
          <h1 className="text-gray-900 dark:text-white py-2">
            {name} ({symbol})
          </h1>

          <table className="">
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
              <td class="text-gray-900 dark:text-white px-6 py-4">
                {parseFloat(changePercent24Hr).toFixed(2)}%
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div className="personlized-data flex-col">
        <div className="ayyaz-data flex items-center border border-gray-500 rounded-md p-4 mb-2">
          <div className="">
            <img
              src={ayyazImg}
              alt=""
              className="image rounded-full"
              width={80}
            />
            <h2 className="text-xl font-bold leading-none text-gray-900 dark:text-white p-2">
              Ayyaz 🤑
            </h2>
          </div>
          <div className="ml-auto">
            <p className="text-xl font-bold text-gray-900 dark:text-white ml-auto">
              ${parseFloat(ayyazCoins * priceUsd).toFixed(3)}
            </p>
          </div>
        </div>
        <div className="ayyaz-data flex items-center border border-gray-500 rounded-md p-4">
          <div className="">
            <img
              src={daniImg}
              alt=""
              className="image rounded-full"
              width={80}
            />
            <h2 className="text-xl font-bold leading-none text-gray-900 dark:text-white p-2">
              Danyal 🤑
            </h2>
          </div>
          <div className="ml-auto">
            <p className="text-xl font-bold text-gray-900 dark:text-white ml-auto">
              ${parseFloat(daniCoins * priceUsd).toFixed(3)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
