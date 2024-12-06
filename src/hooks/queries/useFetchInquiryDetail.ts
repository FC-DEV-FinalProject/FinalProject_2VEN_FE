import { useQuery } from '@tanstack/react-query';

import { fetchInquiryDetail } from '@/api/inquiries/common';
import { UserRole } from '@/types/route';

interface UseFetchInquiryDetailParams {
  role?: UserRole;
  id?: number;
}

const useFetchInquiryDetail = ({ role, id }: UseFetchInquiryDetailParams) =>
  useQuery({
    queryKey: ['inquiries', id, role],
    queryFn: () => fetchInquiryDetail({ id, role }),
    enabled: id !== undefined && !!role,
  });

export default useFetchInquiryDetail;
