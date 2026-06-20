import React, { createContext, useReducer, useState, useEffect } from 'react';
import type { Transaction, Category, FilterState, UIState } from '../types';
import { transactionReducer, type TransactionAction } from '../reducers/transactionReducer';
import { categoryReducer, type CategoryAction } from '../reducers/categoryReducer';
import { DEFAULT_CATEGORIES } from '../constants';

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

const initialFilters: FilterState = {
  searchText: '',
  type: 'all',
  categoryId: '',
  dateFrom: '',
  dateTo: '',
  sortOrder: 'newest',
};

const initialUIState: UIState = {
  isFormOpen: false,
  editingTransactionId: null,
  isCategoryManagerOpen: false,
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize transactions state from localStorage
  const [transactions, dispatchTransactions] = useReducer(
    transactionReducer,
    [],
    () => {
      try {
        const item = window.localStorage.getItem('expense-tracker-transactions');
        return item ? JSON.parse(item) : [];
      } catch (e) {
        console.error('Error loading transactions from localStorage:', e);
        return [];
      }
    }
  );

  // Initialize categories state from localStorage, fallback to DEFAULT_CATEGORIES
  const [categories, dispatchCategories] = useReducer(
    categoryReducer,
    [],
    () => {
      try {
        const item = window.localStorage.getItem('expense-tracker-categories');
        return item ? JSON.parse(item) : DEFAULT_CATEGORIES;
      } catch (e) {
        console.error('Error loading categories from localStorage:', e);
        return DEFAULT_CATEGORIES;
      }
    }
  );

  // Filters and UI states are not persisted in localStorage
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [uiState, setUiState] = useState<UIState>(initialUIState);

  // Persist transactions to localStorage on change
  useEffect(() => {
    try {
      window.localStorage.setItem('expense-tracker-transactions', JSON.stringify(transactions));
    } catch (e) {
      console.error('Error saving transactions to localStorage:', e);
    }
  }, [transactions]);

  // Persist categories to localStorage on change
  useEffect(() => {
    try {
      window.localStorage.setItem('expense-tracker-categories', JSON.stringify(categories));
    } catch (e) {
      console.error('Error saving categories to localStorage:', e);
    }
  }, [categories]);

  return (
    <AppContext.Provider
      value={{
        transactions,
        dispatchTransactions,
        categories,
        dispatchCategories,
        filters,
        setFilters,
        uiState,
        setUiState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
