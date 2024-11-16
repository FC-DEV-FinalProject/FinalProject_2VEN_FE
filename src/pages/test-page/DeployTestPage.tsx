import { useEffect, useState } from 'react';

import axios from 'axios';

import { API_BASE_URL, apiClient } from '@/api/apiClient';

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

const DeployTestPage = () => {
  const [notices, setNotices] = useState<NoticeResponse>(initialNoticeResponse);
  const [error, setError] = useState('');

  useEffect(() => {
    // API 요청 함수 정의
    const fetchNotices = async () => {
      try {
        console.log('API_BASE_URL:', API_BASE_URL);
        console.log('apiClient baseURL:', apiClient.defaults.baseURL);

        const response = await apiClient.get(`${API_BASE_URL}/api/notices`);
        console.log('Response status:', response.status);

        const data = await response.data;
        setNotices(data);
        console.log('API Response:', response);
        console.log('Notices state:', notices);
        console.log('API Response:', response.data); // 디버깅용
        console.error('Failed to fetch notices:', error); // 디버깅 로그
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // AxiosError 타입의 에러일 때만 처리
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
      <h1>너는 알까~ 두근거리는 내 마음~</h1>
      {notices ? (
        <ul>
          <li>Page Number: {notices.pageable.pageNumber}</li>
          <li>Page Size: {notices.pageable.pageSize}</li>
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

export default DeployTestPage;
