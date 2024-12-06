import { css } from '@emotion/react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Avatar from '@/components/common/Avatar';
import Loader from '@/components/common/Loading';
import Pagination from '@/components/common/Pagination';
import Toast from '@/components/common/Toast';
import InquiryStatusLabel from '@/components/page/mypage/InquiryStatusLabel';
import { ROUTES } from '@/constants/routes';
import useFetchInquiries from '@/hooks/queries/useFetchInquiries';
import { useAuthStore } from '@/stores/authStore';
import useToastStore from '@/stores/toastStore';
import theme from '@/styles/theme';
import { InquiryListItem } from '@/types/inquiries';

const MyInquiriesPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPageFromQuery = parseInt(searchParams.get('page') || '1', 10);

  const { isToastVisible, hideToast, message, type } = useToastStore();

  const { inquiries, isLoading, isError, totalPages, totalElements, pageSize } = useFetchInquiries({
    userId: user?.memberId,
    role: user?.role,
    page: currentPageFromQuery - 1,
    pageSize: 10,
  });

  const handleRowClick = (id: number) => {
    navigate(`${ROUTES.MYPAGE.INVESTOR.MYINQUIRY.DETAIL(id.toString())}`);
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ page: String(page) });
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return (
      <div css={myPageWrapperStyle}>
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div css={myPageWrapperStyle}>
        <p css={emptyStateWrapperStyle}>
          데이터를 불러오는 데 실패했습니다. <br /> 다시 시도하거나 잠시 후에 확인해주세요.
        </p>
      </div>
    );
  }

  return (
    <section css={myPageWrapperStyle}>
      <header css={myPageHeaderStyle}>
        <h2>나의 문의</h2>
        <p>
          총 <span>{totalElements}</span>개의 문의 내역이 있습니다
        </p>
      </header>

      {totalElements === 0 ? (
        <p css={emptyStateWrapperStyle}>
          전략에 대해 궁금한 점이 있으면, 트레이더에게 문의를 남겨보세요! <br /> ‘전략 상세’에서
          ‘문의하기’를 통해 손쉽게 문의하실 수 있습니다.
        </p>
      ) : (
        <div css={tableWrapperStyle}>
          <div css={tableContainerStyle}>
            <table>
              <colgroup css={colgroupStyle}>
                <col />
                <col />
                <col />
                <col />
              </colgroup>
              <thead>
                <tr>
                  <th>제목</th>
                  <th>트레이더</th>
                  <th>답변상태</th>
                  <th>날짜</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inquiry: InquiryListItem) => (
                  <tr key={inquiry.id} onClick={() => handleRowClick(inquiry.id)}>
                    <td>
                      <span>Q.</span> {inquiry.title}
                    </td>
                    <td>
                      <div>
                        <Avatar
                          src={inquiry.investorProfileUrl}
                          alt={`${inquiry.investorName}'s profile`}
                          size={24}
                        />
                        <span>{inquiry.investorName}</span>
                      </div>
                    </td>
                    <td>
                      <InquiryStatusLabel status={inquiry.status} />
                    </td>
                    <td>{inquiry.createdAt.slice(0, 10).replace(/-/g, '.')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            totalPage={totalPages}
            limit={pageSize}
            page={currentPageFromQuery}
            setPage={handlePageChange}
          />
        </div>
      )}
      {isToastVisible && (
        <Toast
          message={message}
          isVisible={isToastVisible}
          onClose={hideToast}
          type={type}
          duration={1200}
        />
      )}
    </section>
  );
};

const myPageWrapperStyle = css`
  width: 955px;
  padding: 48px 40px 80px 40px;
  background-color: ${theme.colors.main.white};
  border-radius: 8px;

  @media (max-width: 1180px) {
    width: 800px;
  }

  @media (max-width: 1024px) {
    width: 658px;
  }
`;

const myPageHeaderStyle = css`
  margin-bottom: 40px;

  h2 {
    ${theme.textStyle.headings.h3}
    margin-bottom: 8px;
  }

  p {
    ${theme.textStyle.body.body3}

    span {
      color: ${theme.colors.main.primary};
    }
  }
`;

const tableWrapperStyle = css`
  display: flex;
  flex-direction: column;
  gap: 56px;
`;

const tableContainerStyle = css`
  table {
    width: 875px;
    border-collapse: collapse;
  }

  thead tr {
    height: 48px;
    background-color: ${theme.colors.gray[100]};
    border-bottom: 1px solid ${theme.colors.gray[500]};
  }

  thead th {
    vertical-align: middle;
    ${theme.textStyle.body.body1}
    color: ${theme.colors.gray[700]};
  }

  tbody tr {
    border-bottom: 1px solid ${theme.colors.gray[300]};
    background-color: ${theme.colors.main.white};

    &:hover {
      background-color: ${theme.colors.teal[50]};
      cursor: pointer;
    }
  }

  tbody td {
    height: 90px;
    vertical-align: middle;
    text-align: center;

    &:nth-of-type(1) {
      text-align: left;
      padding: 0 24px;

      span {
        color: ${theme.colors.gray[300]};
        margin-right: 12px;
      }
    }

    &:nth-of-type(2) {
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;

        span {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }

    &:nth-of-type(3) {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 140px;
    }
  }
`;

const colgroupStyle = css`
  col:nth-of-type(1) {
    width: 415px;
  }
  col:nth-of-type(2) {
    width: 200px;
  }
  col:nth-of-type(3) {
    width: 140px;
  }
  col:nth-of-type(4) {
    width: 120px;
  }
`;

const emptyStateWrapperStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  text-align: center;
  color: ${theme.colors.gray[400]};
`;

export default MyInquiriesPage;
