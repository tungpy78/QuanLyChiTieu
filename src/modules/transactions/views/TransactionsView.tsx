import React from 'react';
import { useTransactions } from '../../../hooks/useTransactions';
import { TransactionList } from '../components/TransactionList';

export const TransactionsView: React.FC = () => {
  const { filteredTransactions } = useTransactions();

  return (
    <div className="transaction-list-container">
      <h3 className="section-title">Lịch sử giao dịch ({filteredTransactions.length})</h3>
      <TransactionList />
    </div>
  );
};
