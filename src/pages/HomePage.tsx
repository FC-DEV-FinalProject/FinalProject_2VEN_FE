import { useEffect } from 'react';

import SignUpSuccessPage from '@/pages/auth/signup/SignUpSuccessPage';

const HomePage = () => {
  useEffect(() => {
    const apiHost = import.meta.env.VITE_BASE_URL;
    const fetchNotices = async () => {
      try {
        console.log('Requesting URL:', `${apiHost}/api/notices`);
        const response = await fetch(`${apiHost}/api/notices`);
        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Response data:', data);
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
