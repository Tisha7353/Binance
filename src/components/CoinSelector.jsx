import React from 'react';

const CoinSelector = ({ selectedCoin, onCoinChange, interval, onIntervalChange }) => {
  return (
    <div className="mb-4">
      <label className="mr-2 font-bold">Select Coin:</label>
      <select
        value={selectedCoin}
        onChange={(e) => onCoinChange(e.target.value)}
        className="border p-2 rounded-lg"
      >
        <option value="ethusdt">ETH/USDT</option>
        <option value="bnbusdt">BNB/USDT</option>
        <option value="dotusdt">DOT/USDT</option>
      </select>

      <label className="ml-6 mr-2 font-bold">Interval:</label>
      <select
        value={interval}
        onChange={(e) => onIntervalChange(e.target.value)}
        className="border p-2 rounded-lg"
      >
        <option value="1m">1 Minute</option>
        <option value="3m">3 Minutes</option>
        <option value="5m">5 Minutes</option>
      </select>
    </div>
  );
};

export default CoinSelector;
