import { useEffect, useState } from 'react';

import axios from 'axios';

import { apiClient } from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';

interface Notice {
  id: number;
  noticeStatus: string;
  title: string;
  content: string;
  postedAt: string;
  updatedAt: string;
  scheduledAt: string;
  viewCount: number;
  writerId: number;
}

interface Sort {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

interface NoticeResponse {
  content: Notice[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

const initialNoticeResponse: NoticeResponse = {
  content: [],
  pageable: {
    pageNumber: 0,
    pageSize: 10,
    sort: {
      sorted: false,
      empty: true,
      unsorted: true,
    },
    offset: 0,
    paged: true,
    unpaged: false,
  },
  totalElements: 0,
  totalPages: 0,
  last: true,
  size: 10,
  number: 0,
  sort: {
    sorted: false,
    empty: true,
    unsorted: true,
  },
  numberOfElements: 0,
  first: true,
  empty: true,
};

const APITestPage = () => {
  const [notices, setNotices] = useState<NoticeResponse>(initialNoticeResponse);
  const [, setError] = useState('');

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        console.log('apiClient baseURL:', apiClient.defaults.baseURL);

        const response = await apiClient.get('/mock/api/example', {
          headers: {
            useMock: true,
          },
        });
        const data = await response.data;
        setNotices(data);

        const response1 = await apiClient.get(API_ENDPOINTS.ADMIN.TRADING_TYPES, {
          headers: {
            Authorization: 'admin',
          },
        });
        console.log('API Response: ', response1.data);

        console.log('Response status:', response.status);
        console.log('mockAPI Response:', data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.message || 'An error occurred while fetching notices');
        } else {
          setError('An unknown error occurred');
        }
        console.error('Failed to fetch notices:', error);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div>
      <br></br>
      <p>-----------------</p>
      <h1>아래는 api 백엔드 연결</h1>
      {notices ? (
        <ul>
          <li>Total Elements: {notices.totalElements}</li>
          <li>Total Pages: {notices.totalPages}</li>
          <li>Is First Page: {notices.first ? 'Yes' : 'No'}</li>
          <li>Is Last Page: {notices.last ? 'Yes' : 'No'}</li>
          <li>Is Empty: {notices.empty ? 'Yes' : 'No'}</li>
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default APITestPage;
