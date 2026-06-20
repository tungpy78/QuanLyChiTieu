import React from 'react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  description?: string;
  variant: 'income' | 'expense' | 'balance' | 'count';
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  description,
  variant,
}) => {
  return (
    <div className={`summary-card card-${variant}`}>
      <div className="card-header">
        <span className="card-title">{title}</span>
        <span className="card-icon" aria-hidden="true">
          {variant === 'income' && '📈'}
          {variant === 'expense' && '📉'}
          {variant === 'balance' && '⚖️'}
          {variant === 'count' && '📊'}
        </span>
      </div>
      <div className="card-body">
        <span className="card-value">{value}</span>
        {description && <span className="card-desc">{description}</span>}
      </div>
    </div>
  );
};
