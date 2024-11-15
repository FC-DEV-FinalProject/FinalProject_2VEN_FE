import { useEffect, useState } from 'react';

import { API_BASE_URL } from '@/constants/api';

interface Pageable {
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
  sort: {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  };
}

interface NoticesData {
  content: { id: number; title: string; body: string }[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

const HomePage = () => {
  const [noticesData, setNoticesData] = useState<NoticesData | null>(null);
  useEffect(() => {
    console.log('Updated noticesData:', noticesData);
  }, [noticesData]);
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        console.log('Requesting URL:', `${API_BASE_URL}}/api/notices`);
        const response = await fetch('/api/notices', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
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
        {noticesData && (
          <ul>
            <li>Total Elements: {noticesData.totalElements}</li>
          </ul>
        )}
      </div>
    </div>
  );
};
export default HomePage;
