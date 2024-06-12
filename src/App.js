import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

import Stockdetail from './Stockdetail';
import Fearandgreed from './Fearandgreed';
import FinancialPage from './FinancialPage';

function App() {
  const [fetchFolderName, setFetchFolderName] = useState('');
  const [displayFolderName, setDisplayFolderName] = useState('');
  const [message, setMessage] = useState('');
  const [summary, setSummary] = useState({
    total_completed: 0,
    successful_downloads: 0,
    failed_downloads: 0,
    no_update_needed: 0,
  });
  const [latestStockData, setLatestStockData] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);

  const handleDownloadAll = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/download_all_stocks', { folder_name: fetchFolderName });
      setMessage('Download started. Check console for progress...');
      setSummary(response.data);
    } catch (error) {
      setMessage(error.response ? error.response.data.error : 'Error initiating download');
    }
  };

  const fetchLatestStockData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/latest_stock_data', {
        params: { folder_name: displayFolderName }
      });
      setLatestStockData(response.data);
      setMessage('Data fetched successfully.');
    } catch (error) {
      setMessage('Error fetching latest stock data.');
      console.error('Error fetching latest stock data:', error);
      setLatestStockData([]);
    }
  };

  return (
    <div className="App">
      <Fearandgreed />
      <FinancialPage />
      <header className="App-header">
        <h1>Stock Data Downloader</h1>
        <input
          type="text"
          value={fetchFolderName}
          onChange={(e) => setFetchFolderName(e.target.value)}
          placeholder="Enter download folder path"
        />
        <button onClick={handleDownloadAll}>Download Daily Stock Data</button>
        <input
          type="text"
          value={displayFolderName}
          onChange={(e) => setDisplayFolderName(e.target.value)}
          placeholder="Enter fetch folder path"
        />
        <button onClick={fetchLatestStockData}>Fetch Latest Stock Data</button>
        {message && <p>{message}</p>}
        {summary && (
          <div>
            <h2>Summary</h2>
            <p>Total completed: {summary.total_completed}</p>
            <p>Successful downloads: {summary.successful_downloads}</p>
            <p>Failed downloads: {summary.failed_downloads}</p>
            <p>No update needed: {summary.no_update_needed}</p>
          </div>
        )}
        {latestStockData.length > 0 && (
          <div>
            <h2>Latest Stock Data</h2>
              <p>{latestStockData.length}</p>
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
                {latestStockData.map(stock => (
                  <tr className='test' key={stock.symbol} onClick={() => setSelectedStock(stock.symbol)}>
                    <td>{stock.symbol}</td>
                    <td>{stock.date}</td>
                    <td>{stock.open}</td>
                    <td>{stock.high}</td>
                    <td>{stock.low}</td>
                    <td>{stock.close}</td>
                    <td>{stock.volume}</td>
                  </tr>
                ))}
              
              </tbody>
            </table>
          </div>
        )}
        {selectedStock && (
          <Stockdetail symbol={selectedStock} folderName={displayFolderName} /> 
        )}
      </header>
    </div>
  );
}

export default App;
