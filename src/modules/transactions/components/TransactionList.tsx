import React, { useContext } from 'react';
import { useTransactions } from '../../../hooks/useTransactions';
import { TransactionItem } from './TransactionItem';
import { AppContext } from '../../../context/AppContext';
import { EmptyState } from '../../../components/common/EmptyState';

export const TransactionList: React.FC = () => {
  const { filteredTransactions, deleteTransaction } = useTransactions();
  const context = useContext(AppContext);
  if (!context) {
    return null;
  }

  const { setUiState } = context;

  const handleEdit = (id: string) => {
    setUiState((prev) => ({
      ...prev,
      isFormOpen: true,
      editingTransactionId: id,
    }));
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa giao dịch này không?');
    if (confirmed) {
      deleteTransaction(id);
    }
  };

  if (filteredTransactions.length === 0) {
    return (
      <EmptyState
        title="Chưa có giao dịch nào"
        description='Hãy nhấn nút "+ Thêm giao dịch" ở góc trên để ghi lại giao dịch đầu tiên của bạn.'
      />
    );
  }

  return (
    <div className="transaction-list">
      {filteredTransactions.map((tx) => (
        <TransactionItem
          key={tx.id}
          transaction={tx}
          onEdit={() => handleEdit(tx.id)}
          onDelete={() => handleDelete(tx.id)}
        />
      ))}
    </div>
  );
};
