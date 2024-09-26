import React, { useState, useEffect } from 'react';
import ChartComponent from './components/ChartComponent';
import CoinSelector from './components/CoinSelector';

const App = () => {
  const [selectedCoin, setSelectedCoin] = useState('ethusdt');
  const [interval, setInterval] = useState('1m');
  const [coinData, setCoinData] = useState({});

  useEffect(() => {
    // Retrieve data from localStorage when switching coins
    const savedData = localStorage.getItem(selectedCoin);
    if (savedData) {
      setCoinData(JSON.parse(savedData));
    } else {
      setCoinData({});
    }
  }, [selectedCoin]);

  const handleCoinChange = (newCoin) => {
    setSelectedCoin(newCoin);
  };

  const handleIntervalChange = (newInterval) => {
    setInterval(newInterval);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Binance Market Data</h1>
      <CoinSelector
        selectedCoin={selectedCoin}
        onCoinChange={handleCoinChange}
        interval={interval}
        onIntervalChange={handleIntervalChange}
      />
      <ChartComponent
        selectedCoin={selectedCoin}
        interval={interval}
        coinData={coinData}
        setCoinData={setCoinData}
      />
    </div>
  );
};

export default App;
