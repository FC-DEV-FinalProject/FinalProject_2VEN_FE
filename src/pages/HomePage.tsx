import { useEffect, useState } from 'react';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any[];
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
  // const apiHost = import.meta.env.VITE_BASE_URL;

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
        <h2>Notices Data</h2>
        {noticesData ? (
          <ul>
            <li>Page Number: {noticesData.pageable.pageNumber}</li>
            <li>Page Size: {noticesData.pageable.pageSize}</li>
            <li>Total Elements: {noticesData.totalElements}</li>
            <li>Total Pages: {noticesData.totalPages}</li>
            <li>Is First Page: {noticesData.first ? 'Yes' : 'No'}</li>
            <li>Is Last Page: {noticesData.last ? 'Yes' : 'No'}</li>
            <li>Is Empty: {noticesData.empty ? 'Yes' : 'No'}</li>
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
