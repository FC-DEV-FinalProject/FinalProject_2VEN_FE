import { useState, useEffect } from 'react';

import { css } from '@emotion/react';

import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Select from '@/components/common/Select';
import FileUpload from '@/components/page/strategy/form-content/FileUpload';
import ProductType from '@/components/page/strategy/form-content/ProductType';
import StrategyIntro from '@/components/page/strategy/form-content/StrategyIntro';
import StrategyName from '@/components/page/strategy/form-content/StrategyName';
import { investmentFunds, isPublic } from '@/constants/createOptions';
import { useSubmitStrategyCreate } from '@/hooks/mutations/useSubmitStrategyCreate';
import { useSubmitStrategyUpdate } from '@/hooks/mutations/useSubmitStrategyUpdate';
import { useUploadProposalFile } from '@/hooks/mutations/useUploadProposalFile';
import useFetchStrategyOptionData from '@/hooks/queries/useFetchStrategyOptionData';
import useCreateFormValidation from '@/hooks/useCreateFormValidation';
import useModalStore from '@/stores/modalStore';
import { useStrategyFormStore } from '@/stores/strategyFormStore';
import useToastStore from '@/stores/toastStore';
import theme from '@/styles/theme';
import { StrategyPayload, StrategyDetailsData, Requirements } from '@/types/strategy';

const StrategyForm = ({
  strategyDetailData,
  requirements,
  isEditMode,
}: {
  strategyDetailData?: StrategyDetailsData;
  requirements?: Requirements;
  isEditMode?: boolean;
}) => {
  const {
    strategy,
    text,
    operation,
    cycle,
    fund,
    publicStatus,
    selectedProducts,
    setField,
    checkProduct,
    clearForm,
  } = useStrategyFormStore();

  useEffect(() => {
    if (isEditMode && strategyDetailData && requirements) {
      setField('strategy', strategyDetailData.strategyTitle);
      setField('text', strategyDetailData.strategyOverview);
      setField(
        'operation',
        String(
          requirements.tradingTypeRegistrationDtoList.find(
            (item) => item.tradingTypeName === strategyDetailData.tradingTypeName
          )?.tradingTypeId ?? ''
        )
      );

      setField(
        'cycle',
        String(
          requirements.tradingCycleRegistrationDtoList.find(
            (item) => item.tradingCycleName === strategyDetailData.tradingCycleName
          )?.tradingCycleId ?? ''
        )
      );
      setField('fund', strategyDetailData.minInvestmentAmount);
      setField('publicStatus', strategyDetailData.isPosted);
      setField(
        'selectedProducts',
        strategyDetailData.strategyIACEntities.map((item) => String(item.investmentAssetClassesId))
      );

      if (strategyDetailData.strategyProposalLink) {
        setUploadedFileUrl(strategyDetailData.strategyProposalLink);
        setUploadedFileName(strategyDetailData.strategyProposalFileTitle);
      }
    }
  }, [isEditMode, strategyDetailData, requirements, setField]);

  useEffect(
    () => () => {
      clearForm();
    },
    [clearForm]
  );

  const { openModal } = useModalStore();
  const { strategyData, loading, error } = useFetchStrategyOptionData();
  const { mutate: submitStrategy, status } = useSubmitStrategyCreate();
  const { mutate: uploadFile } = useUploadProposalFile();
  const { mutate: updateStrategy } = useSubmitStrategyUpdate();
  const isSubmitting = status === 'pending';
  const { showToast } = useToastStore();

  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const formState = { strategy, text, operation, cycle, fund, publicStatus, selectedProducts };
  const isFormValid = useCreateFormValidation(formState);

  const handleFileSelect = (selectedFile: File | null) => {
    if (selectedFile) {
      uploadFile(
        { file: selectedFile, authType: 'Trader' },
        {
          onSuccess: (data) => {
            setUploadedFileUrl(data.fileUrl);
            setUploadedFileName(data.displayName);
          },
          onError: (error) => {
            console.error('파일 업로드 실패:', error);
          },
        }
      );
    }
  };

  const handleFileRemove = () => {
    setUploadedFileUrl(null);
    setUploadedFileName(null);
  };

  const handleSubmit = async () => {
    const payload: StrategyPayload = {
      strategyTitle: strategy,
      tradingTypeId: Number(operation),
      tradingCycleId: Number(cycle),
      minInvestmentAmount: fund,
      strategyOverview: text,
      isPosted: publicStatus,
      strategyProposalLink: uploadedFileUrl || null,
      investmentAssetClassesIdList: selectedProducts.map((v) => Number(v)),
    };

    try {
      if (isEditMode && strategyDetailData) {
        updateStrategy({ strategyId: strategyDetailData.strategyId, payload });
        showToast('전략 수정이 성공적으로 완료되었습니다', 'basic');
      } else {
        submitStrategy(payload);
        showToast('전략 등록이 성공적으로 완료되었습니다', 'basic');
      }
    } catch (error) {
      console.error('전략 등록/수정 실패:', error);
    }
  };

  const onClickRegister = () => {
    openModal({
      type: 'confirm',
      title: isEditMode ? '전략 수정' : '전략 등록',
      desc: isEditMode ? '전략을 수정하시겠습니까?' : '전략을 저장하시겠습니까?',
      onAction: async () => {
        await handleSubmit();
      },
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  if (loading) return <p>Loading.....</p>;
  if (error) return <p>{error}</p>;

  return (
    <form css={formContainerStyle} onSubmit={handleFormSubmit}>
      <StrategyName strategy={strategy} onStrategyChange={(value) => setField('strategy', value)} />

      <div css={selectContainerStyle}>
        <section css={flexAlignStyle}>
          <label htmlFor='operation' css={labelStyle}>
            운용방식
          </label>
          <Select
            id='operation'
            options={strategyData.operations}
            value={strategyData.operations.find(
              (option) => option.label === strategyDetailData?.tradingTypeName
            )}
            onChange={(option) => setField('operation', option.value)}
          />
        </section>

        <section css={flexAlignStyle}>
          <label htmlFor='cycle' css={labelStyle}>
            주기
          </label>
          <Select
            id='cycle'
            value={strategyData.cycles.find(
              (option) => option.label === strategyDetailData?.tradingCycleName
            )}
            options={strategyData.cycles}
            onChange={(option) => setField('cycle', option.value)}
          />
        </section>
      </div>

      <section css={flexAlignStyle}>
        <label htmlFor='fund' css={labelStyle}>
          최소운용가능금액
        </label>
        <Select
          id='fund'
          options={investmentFunds}
          value={investmentFunds.find(
            (option) => option.label === strategyDetailData?.minInvestmentAmount
          )}
          onChange={(option) => setField('fund', option.value)}
        />
      </section>

      <StrategyIntro
        text={text}
        onTextChange={(e) => setField('text', e.target.value)}
        maxLength={1000}
      />

      <ProductType
        products={strategyData.products}
        selectedProducts={selectedProducts}
        onProductChange={(productId) => checkProduct(productId)}
      />

      <section css={flexAlignStyle}>
        <label htmlFor='public-status' css={labelStyle}>
          공개여부
        </label>
        <Select
          id='public-status'
          options={isPublic}
          value={isPublic.find((option) => option.value === strategyDetailData?.isPosted)}
          onChange={(option) => setField('publicStatus', option.value)}
        />
      </section>

      <FileUpload
        onFileSelect={handleFileSelect}
        uploadedFileUrl={uploadedFileUrl}
        setUploadedFileUrl={setUploadedFileUrl}
        displayName={uploadedFileName}
        onFileRemove={handleFileRemove}
      />

      <div css={buttonContainerStyle}>
        <Button
          type='button'
          variant='primary'
          size='lg'
          width={326}
          disabled={!isFormValid || isSubmitting}
          onClick={onClickRegister}
        >
          {isEditMode ? '수정하기' : '저장하기'}
        </Button>
      </div>
      <Modal />
    </form>
  );
};

const formContainerStyle = css`
  display: flex;
  width: 1000px;
  flex-direction: column;
  gap: 56px;
`;

const labelStyle = css`
  color: ${theme.colors.main.black};
  font-size: ${theme.typography.fontSizes.caption};
  line-height: ${theme.typography.lineHeights.lg};
`;

const selectContainerStyle = css`
  display: flex;
  gap: 40px;
`;

const flexStyle = css`
  display: flex;
  gap: 24px;
`;

const flexAlignStyle = css`
  ${flexStyle};
  align-items: center;
`;

const buttonContainerStyle = css`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default StrategyForm;
