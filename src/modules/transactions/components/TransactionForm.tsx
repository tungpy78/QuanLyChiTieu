import React, { useContext, useState } from 'react';
import { AppContext } from '../../../context/AppContext';
import { useTransactions } from '../../../hooks/useTransactions';
import { useCategories } from '../../../hooks/useCategories';
import { Input } from '../../../components/common/Input';
import { Button } from '../../../components/common/Button';
import type { TransactionType } from '../types/transaction.type';

interface FormErrors {
  name?: string;
  type?: string;
  amount?: string;
  categoryId?: string;
  date?: string;
}

export const TransactionForm: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('TransactionForm must be used within an AppProvider');
  }

  const { uiState, setUiState, transactions } = context;
  const { editingTransactionId } = uiState;
  const { addTransaction, updateTransaction } = useTransactions();
  const { categories } = useCategories();

  // Find the transaction to edit if ID is provided
  const editingTransaction = editingTransactionId
    ? transactions.find((t) => t.id === editingTransactionId)
    : null;

  // Helper to generate today's date in local YYYY-MM-DD
  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Form states
  const [name, setName] = useState(editingTransaction ? editingTransaction.name : '');
  const [type, setType] = useState<TransactionType | ''>(editingTransaction ? editingTransaction.type : '');
  const [amount, setAmount] = useState(editingTransaction ? editingTransaction.amount.toString() : '');
  const [categoryId, setCategoryId] = useState(editingTransaction ? editingTransaction.categoryId : '');
  const [date, setDate] = useState(editingTransaction ? editingTransaction.date : getTodayDateString());
  const [note, setNote] = useState(editingTransaction ? editingTransaction.note : '');
  const [errors, setErrors] = useState<FormErrors>({});

  // Form Validation logic
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Tên giao dịch không được bỏ trống.';
    }

    if (!type) {
      newErrors.type = 'Vui lòng chọn loại giao dịch (Thu hoặc Chi).';
    }

    const parsedAmount = Number(amount);
    if (!amount.trim()) {
      newErrors.amount = 'Số tiền không được bỏ trống.';
    } else if (isNaN(parsedAmount) || parsedAmount <= 0) {
      newErrors.amount = 'Số tiền phải là số lớn hơn 0.';
    }

    if (!categoryId) {
      newErrors.categoryId = 'Vui lòng chọn danh mục.';
    }

    if (!date) {
      newErrors.date = 'Vui lòng chọn ngày giao dịch.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const transactionData = {
      name: name.trim(),
      type: type as TransactionType,
      amount: Number(amount),
      categoryId,
      date,
      note: note.trim(),
    };

    if (editingTransactionId && editingTransaction) {
      updateTransaction({
        ...editingTransaction,
        ...transactionData,
      });
    } else {
      addTransaction(transactionData);
    }

    // Close the modal
    setUiState((prev) => ({
      ...prev,
      isFormOpen: false,
      editingTransactionId: null,
    }));
  };

  const handleCancel = () => {
    setUiState((prev) => ({
      ...prev,
      isFormOpen: false,
      editingTransactionId: null,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <Input
        label="Tên giao dịch"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ví dụ: Mua thức ăn, Lương tháng 6..."
        error={errors.name}
      />

      <div className={`form-group ${errors.type ? 'has-error' : ''}`}>
        <label className="form-label">Loại giao dịch</label>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="transactionType"
              value="income"
              checked={type === 'income'}
              onChange={() => setType('income')}
            />
            Thu nhập (Income)
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="transactionType"
              value="expense"
              checked={type === 'expense'}
              onChange={() => setType('expense')}
            />
            Chi tiêu (Expense)
          </label>
        </div>
        {errors.type && <span className="error-message">{errors.type}</span>}
      </div>

      <Input
        label="Số tiền (₫)"
        type="number"
        min="0.01"
        step="any"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Nhập số tiền..."
        error={errors.amount}
      />

      <div className={`form-group ${errors.categoryId ? 'has-error' : ''}`}>
        <label htmlFor="form-category" className="form-label">Danh mục</label>
        <select
          id="form-category"
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">-- Chọn danh mục --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name} {cat.isDefault ? '(Mặc định)' : ''}
            </option>
          ))}
        </select>
        {errors.categoryId && <span className="error-message">{errors.categoryId}</span>}
      </div>

      <Input
        label="Ngày giao dịch"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        error={errors.date}
      />

      <div className="form-group">
        <label htmlFor="form-note" className="form-label">Ghi chú (Tùy chọn)</label>
        <textarea
          id="form-note"
          className="form-control textarea"
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Nhập ghi chú..."
        />
      </div>

      <div className="form-actions">
        <Button variant="secondary" onClick={handleCancel}>
          Hủy
        </Button>
        <Button type="submit" variant="primary">
          {editingTransactionId ? 'Cập nhật' : 'Thêm giao dịch'}
        </Button>
      </div>
    </form>
  );
};
