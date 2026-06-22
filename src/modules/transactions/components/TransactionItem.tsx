import React from 'react';
import type { Transaction } from '../../../types';
import { useCategories } from '../../../hooks/useCategories';
import { formatCurrency } from '../../../utils/formatCurrency';
import { formatDate } from '../../../utils/formatDate';
import { Button } from '../../../components/common/Button';

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: () => void;
  onDelete: () => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  onEdit,
  onDelete,
}) => {
  const { getCategoryNameById } = useCategories();
  const categoryName = getCategoryNameById(transaction.categoryId);
  const isIncome = transaction.type === 'income';

  return (
    <div className={`transaction-item item-${transaction.type}`}>
      <div className="item-main">
        <div className="item-info">
          <h4 className="item-name">{transaction.name}</h4>
          <div className="item-meta">
            <span className="badge badge-category">{categoryName}</span>
            <span className="item-date">📅 {formatDate(transaction.date)}</span>
          </div>
          {transaction.note && <p className="item-note">💬 {transaction.note}</p>}
        </div>
        <div className="item-amount-actions">
          <span className={`item-amount ${isIncome ? 'amount-income' : 'amount-expense'}`}>
            {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
          </span>
          <div className="item-actions">
            <Button variant="secondary" className="btn-sm" onClick={onEdit}>
              Sửa
            </Button>
            <Button variant="danger" className="btn-sm" onClick={onDelete}>
              Xóa
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
