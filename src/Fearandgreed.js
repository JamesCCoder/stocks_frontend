import React, { useEffect, useState } from "react";

function Fearandgreed() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_FEAR_AND_GREED_API_URL);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setData(data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
        };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Fear and Greed Index</h1>
        {data ? (
          <div>
            <p>Index Value: {data.index_value}</p>
            <p>Status: {data.status}</p>
            <p>Last Update: {data.last_update}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </div>
  );
}

export default Fearandgreed;
