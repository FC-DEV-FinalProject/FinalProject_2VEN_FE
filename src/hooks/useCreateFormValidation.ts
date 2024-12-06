import { useEffect, useState } from 'react';

interface FormValidationProps {
  strategy: string;
  operation: string;
  cycle: string;
  fund: string;
  text: string;
  publicStatus: string;
  selectedProducts: string[];
}

const useCreateFormValidation = (formState: FormValidationProps) => {
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = (): boolean =>
    formState.strategy.trim() !== '' &&
    formState.operation.trim() !== '' &&
    formState.cycle.trim() !== '' &&
    formState.fund.trim() !== '' &&
    formState.text.trim() !== '' &&
    formState.publicStatus.trim() !== '' &&
    formState.selectedProducts.length > 0;

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [formState]);

  return isFormValid;
};

export default useCreateFormValidation;
