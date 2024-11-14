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
    // console.log('API Host:', apiHost); // 확인용 콘솔 로그
    const fetchNotices = async () => {
      try {
        const response = await fetch(`/api/notices`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data: NoticesData = await response.json();
        setNoticesData(data);
      } catch (error) {
        console.error('Failed to fetch notices:', error);
      }
    };
    console.log(import.meta.env);
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
