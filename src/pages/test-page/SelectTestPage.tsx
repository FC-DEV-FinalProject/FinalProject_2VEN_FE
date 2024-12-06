import Select from '@/components/common/Select';

const operations = [
  { label: '자동', value: 'auto' },
  { label: '반자동(하이브리드)', value: 'hybrid' },
  { label: '수동(매뉴얼)', value: 'manual' },
];

const cycles = [
  { label: '데이', value: 'day' },
  { label: '포지션', value: 'position' },
];

const investmentFunds = [
  { label: '1만원 ~ 500만원', value: '1-500' },
  { label: '500만원 ~ 1000만원', value: '500-1000' },
  { label: '1000만원 ~ 2000만원', value: '1000-2000' },
  { label: '2000만원 ~ 5000만원', value: '2000-5000' },
  { label: '5000만원 ~ 1억', value: '5000-10000' },
  { label: '1억 ~ 2억', value: '10000-20000' },
  { label: '2억 ~ 3억', value: '20000-30000' },
  { label: '3억 ~ 4억', value: '30000-40000' },
  { label: '4억 ~ 5억', value: '40000-50000' },
  { label: '5억 ~ 10억', value: '50000-100000' },
  { label: '10억 이상', value: '100000+' },
];

const isPublic = [
  { label: '공개', value: 'public' },
  { label: '비공개', value: 'private' },
];

const SelectTestPage = () => {
  const handleSelect = (option: { label: string; value: string }) => {
    console.log(option);
  };

  return (
    <>
      <div style={{ display: 'flex', width: '100vh', gap: '20px', marginBottom: '20px' }}>
        <Select options={operations} onChange={handleSelect} />
        <Select options={cycles} onChange={handleSelect} />
        <Select options={investmentFunds} onChange={handleSelect} width='300px' />
        <Select options={isPublic} onChange={handleSelect} disabled={true} />
      </div>
      <div style={{ display: 'flex', width: '100vh', gap: '20px', height: '100vh' }}>
        <Select options={operations} onChange={handleSelect} type='sm' width='100px' />
        <Select options={cycles} onChange={handleSelect} type='sm' disabled={true} />
        <Select options={investmentFunds} onChange={handleSelect} type='sm' />
        <Select options={isPublic} onChange={handleSelect} type='sm' width='80px' />
      </div>
    </>
  );
};

export default SelectTestPage;
