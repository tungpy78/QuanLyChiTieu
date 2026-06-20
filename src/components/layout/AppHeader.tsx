import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

export const AppHeader: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) {
    return null;
  }

  const { setUiState } = context;

  const handleOpenAddForm = () => {
    setUiState((prev) => ({
      ...prev,
      isFormOpen: true,
      editingTransactionId: null,
    }));
  };

  const handleOpenCategoryManager = () => {
    setUiState((prev) => ({
      ...prev,
      isCategoryManagerOpen: true,
    }));
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <h1>Quản lý chi tiêu cá nhân</h1>
        <p className="subtitle">Theo dõi và quản lý dòng tiền của bạn một cách khoa học</p>
      </div>
      <div className="header-actions">
        <button className="btn btn-secondary btn-manage-cats" onClick={handleOpenCategoryManager}>
          Quản lý danh mục
        </button>
        <button className="btn btn-primary btn-add" onClick={handleOpenAddForm}>
          + Thêm giao dịch
        </button>
      </div>
    </header>
  );
};
