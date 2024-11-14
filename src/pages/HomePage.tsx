import { useEffect, useState } from 'react';

import SignUpSuccessPage from '@/pages/auth/signup/SignUpSuccessPage';

const HomePage = () => {
  const [noticesData, setNoticesData] = useState([]);
  useEffect(() => {
    console.log('Updated noticesData:', noticesData);
  }, [noticesData]);
  useEffect(() => {
    console.log('VITE_BASE_URL:', import.meta.env.VITE_BASE_URL);
    const fetchNotices = async () => {
      try {
        console.log('Requesting URL:', `${import.meta.env.VITE_BASE_URL}/api/notices`);
        const response = await fetch('/api/notices');
        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Response data:', data);
        setNoticesData(data);
      } catch (error) {
        console.error('Error details:', error);
      }
    };
    fetchNotices();
  }, []);
  return (
    <div>
      <div>
        <SignUpSuccessPage />
      </div>
    </div>
  );
};
export default HomePage;
