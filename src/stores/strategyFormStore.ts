import { create } from 'zustand';

interface StrategyFormState {
  strategy: string;
  text: string;
  operation: string;
  cycle: string;
  fund: string;
  publicStatus: string;
  selectedProducts: string[];
  setField: <T extends keyof StrategyFormState>(field: T, value: StrategyFormState[T]) => void;
  checkProduct: (productId: string) => void;
  clearForm: () => void;
}

export const useStrategyFormStore = create<StrategyFormState>((set) => ({
  strategy: '',
  text: '',
  operation: '',
  cycle: '',
  fund: '',
  publicStatus: '',
  selectedProducts: [],
  setField: (field, value) =>
    set((state) => ({
      ...state,
      [field]: value,
    })),
  checkProduct: (productId) =>
    set((state) => ({
      selectedProducts: state.selectedProducts.includes(productId)
        ? state.selectedProducts.filter((id) => id !== productId)
        : [...state.selectedProducts, productId],
    })),
  clearForm: () =>
    set({
      strategy: '',
      text: '',
      operation: '',
      cycle: '',
      fund: '',
      publicStatus: '',
      selectedProducts: [],
    }),
}));
