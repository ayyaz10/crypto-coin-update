import React, { useState, useEffect } from "react";

const RealTimeCoinData = () => {
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
    <div>
      <h1>
        {name} ({symbol})
      </h1>
      <p>Price (USD): ${parseFloat(priceUsd).toFixed(2)}</p>
      <p>24Hr Change: {parseFloat(changePercent24Hr).toFixed(2)}%</p>
      <div className="personlized-data">
        <div className="ayyaz-data">
          <img
            src="/src/assets/ayyaz-removebg-sreview.png"
            alt=""
            className="image"
          />
          <h3 className="name">Ayyaz 🤑</h3>
          <p className="current-profit">
            ${parseFloat(ayyazCoins * priceUsd).toFixed(3)}
          </p>
        </div>
        <div className="ayyaz-data">
          <img
            src="./assets/dani-removebg-preview.png"
            alt=""
            className="image"
          />
          <h3 className="name">Daniyal 🤑</h3>
          <p className="current-profit">
            ${parseFloat(daniCoins * priceUsd).toFixed(3)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RealTimeCoinData;
