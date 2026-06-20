import { useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { filterTransactions } from '../utils/filterTransactions';
import type { Transaction } from '../types';

/**
 * Custom hook to interact with transactions and compute summary/filters.
 */
export const useTransactions = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useTransactions must be used within an AppProvider');
  }

  const {
    transactions,
    dispatchTransactions,
    filters,
    setFilters,
  } = context;

  // Compute filtered & sorted transactions
  const filteredTransactions = useMemo(() => {
    return filterTransactions(transactions, filters);
  }, [transactions, filters]);

  // Compute totals: income, expense, balance, count
  const summary = useMemo(() => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((t) => {
      const amount = Math.abs(t.amount);
      if (t.type === 'income') {
        totalIncome += amount;
      } else if (t.type === 'expense') {
        totalExpense += amount;
      }
    });

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      transactionCount: transactions.length,
    };
  }, [transactions]);

  // Helper to add a new transaction (generates ID and createdAt timestamp)
  const addTransaction = (tData: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTx: Transaction = {
      ...tData,
      id: window.crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    dispatchTransactions({ type: 'ADD_TRANSACTION', payload: newTx });
  };

  // Helper to update a transaction
  const updateTransaction = (tData: Transaction) => {
    dispatchTransactions({ type: 'UPDATE_TRANSACTION', payload: tData });
  };

  // Helper to delete a transaction
  const deleteTransaction = (id: string) => {
    dispatchTransactions({ type: 'DELETE_TRANSACTION', payload: { id } });
  };

  return {
    transactions,
    filteredTransactions,
    filters,
    setFilters,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    summary,
  };
};
