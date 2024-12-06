import { useQuery } from '@tanstack/react-query';

import { fetchPersonalDetails } from '@/api/profile';

const useFetchPersonalDetails = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['personalDetails'],
    queryFn: () => fetchPersonalDetails(),
    initialData: {
      fileId: '',
      email: '',
      nickname: '',
      phoneNumber: '',
      introduction: '',
      marketingOptional: false,
    },
  });

  return { data, isLoading, isError };
};

export default useFetchPersonalDetails;
