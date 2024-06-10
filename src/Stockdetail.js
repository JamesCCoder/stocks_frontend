import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StockDetail({ symbol, folderName }) {
  const [dailyData, setDailyData] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDailyData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/stock_daily_data', {
          params: { symbol, folder_name: folderName }
        });
        setDailyData(response.data);
        setMessage('Data fetched successfully.');
      } catch (error) {
        setMessage('Error fetching daily stock data.');
        console.error('Error fetching daily stock data:', error);
        setDailyData([]);
      }
    };

    fetchDailyData();
  }, [symbol, folderName]);

  return (
    <div>
      <h2>{symbol} - Daily Data</h2>
      {message && <p>{message}</p>}
      {dailyData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Date</th>
              <th>Open</th>
              <th>High</th>
              <th>Low</th>
              <th>Close</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            {dailyData.map((data, index) => (
              <tr key={index}>
                <td>{data['Symbol']}</td>
                <td>{data['date']}</td>
                <td>{data['1. open']}</td>
                <td>{data['2. high']}</td>
                <td>{data['3. low']}</td>
                <td>{data['4. close']}</td>
                <td>{data['5. volume']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StockDetail;
