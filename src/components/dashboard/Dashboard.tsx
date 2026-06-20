import React from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { SummaryCard } from './SummaryCard';
import { formatCurrency } from '../../utils/formatCurrency';

export const Dashboard: React.FC = () => {
  const { summary } = useTransactions();

  return (
    <div className="dashboard-container">
      <h2 className="section-title">Tổng quan tài chính</h2>
      <div className="dashboard-grid">
        <SummaryCard
          title="Tổng thu"
          value={formatCurrency(summary.totalIncome)}
          variant="income"
          description="Khoản tiền thu nhập tích lũy"
        />
        <SummaryCard
          title="Tổng chi"
          value={formatCurrency(summary.totalExpense)}
          variant="expense"
          description="Các khoản chi tiêu tích lũy"
        />
        <SummaryCard
          title="Số dư hiện tại"
          value={formatCurrency(summary.balance)}
          variant="balance"
          description="Số tiền hiện tại khả dụng"
        />
        <SummaryCard
          title="Số giao dịch"
          value={summary.transactionCount}
          variant="count"
          description="Tổng số lượng giao dịch đã ghi"
        />
      </div>
    </div>
  );
};
