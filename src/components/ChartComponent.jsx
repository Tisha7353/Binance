import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const ChartComponent = ({ selectedCoin, interval, coinData, setCoinData }) => {
  const ws = useRef(null);
  
  useEffect(() => {
    // Create WebSocket connection.
    const socketUrl = `wss://stream.binance.com:9443/ws/${selectedCoin}@kline_${interval}`;
    ws.current = new WebSocket(socketUrl);

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const candlestick = data.k;

      // Save new candlestick data
      setCoinData((prevData) => {
        const newData = {
          ...prevData,
          [candlestick.t]: {
            open: candlestick.o,
            high: candlestick.h,
            low: candlestick.l,
            close: candlestick.c,
            time: candlestick.t
          },
        };
        
        // Save the updated data in localStorage
        localStorage.setItem(selectedCoin, JSON.stringify(newData));
        return newData;
      });
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [selectedCoin, interval]);

  // Prepare chart data from candlestick data
  const chartData = {
    labels: Object.values(coinData).map((data) => new Date(data.time).toLocaleTimeString()),
    datasets: [
      {
        label: `${selectedCoin.toUpperCase()} Price`,
        data: Object.values(coinData).map((data) => parseFloat(data.close)),
        fill: false,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div>
      <Line data={chartData} />
    </div>
  );
};

export default ChartComponent;
