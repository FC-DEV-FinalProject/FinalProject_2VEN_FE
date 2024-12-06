import { useEffect, useState } from 'react';

import axios from 'axios';

import { MOCK_API_ENDPOINTS } from '@/mocks/mockEndpoints';

const MockTestPage = () => {
  const [mockData, setMockData] = useState<string | null>(null);

  useEffect(() => {
    const fetchMockData = async () => {
      try {
        const response = await axios.get(MOCK_API_ENDPOINTS.EXAMPLE);
        setMockData(response.data.message);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMockData();
  }, []);

  return (
    <div>
      <h1>MSW Example</h1>
      {mockData ? <p>Response: {mockData}</p> : <p>Loading...</p>}
    </div>
  );
};

export default MockTestPage;
