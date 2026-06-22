import { createContext } from 'react';
import type { Transaction, FilterState } from '../modules/transactions/types/transaction.type';
import type { Category } from '../modules/categories/types/category.type';
import type { UIState } from './app-context.type';
import type { TransactionAction } from '../reducers/transactionReducer';
import type { CategoryAction } from '../reducers/categoryReducer';

export interface AppContextType {
  transactions: Transaction[];
  dispatchTransactions: React.Dispatch<TransactionAction>;
  categories: Category[];
  dispatchCategories: React.Dispatch<CategoryAction>;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  uiState: UIState;
  setUiState: React.Dispatch<React.SetStateAction<UIState>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
