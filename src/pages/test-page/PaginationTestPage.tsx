import { useState } from 'react';

import { css } from '@emotion/react';

import Pagination from '@/components/common/Pagination';

const mockData = Array.from({ length: 220 }, (_, index) => ({
  //여기 length값이랑 아래 limit값으로 조절하시면서 확인해보시면 됩니다.
  id: index + 1,
  title: `항목${index}`,
  img: '/logo.svg',
}));

const PaginationTestPage = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const totalPages = Math.ceil(mockData.length / limit);

  const Attribute = [
    { id: 1, title: '번호' },
    { id: 2, title: '아이콘' },
    { id: 3, title: '제목' },
  ];

  //서버에 limit개씩 끊어서 달라고 요청할거기 때문에 실제로 api 받아와서 쓸 때 이거 따로 계산할 필요 없음
  //받아온 데이터 그대로 map 돌려서 테이블에 넣으심 됩니다
  const getCurrentPageData = () => {
    const startIdx = (page - 1) * limit;
    const endIdx = startIdx + limit;
    return mockData.slice(startIdx, endIdx);
  };

  return (
    <div css={PaginationContainer}>
      <table css={TableStyle}>
        <tr>
          {Attribute.map((item) => (
            <td key={item.id}>{item.title}</td>
          ))}
        </tr>
        {getCurrentPageData().map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{<img src={item.img} alt={`${item.img}-${item.id}`} />}</td>
            <td>{item.title}</td>
          </tr>
        ))}
      </table>
      <Pagination totalPage={totalPages} limit={limit} page={page} setPage={setPage} />
    </div>
  );
};

export default PaginationTestPage;

const PaginationContainer = css`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const TableStyle = css`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  td,
  tr {
    border: 1px solid black;
    padding: 12px;
    text-align: center;
  }

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
`;
