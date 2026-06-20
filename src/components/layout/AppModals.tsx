import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Modal } from '../ui/Modal';
import { TransactionForm } from '../transactions/TransactionForm';
import { CategoryManager } from '../categories/CategoryManager';

export const AppModals: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) {
    return null;
  }

  const { uiState, setUiState } = context;

  const handleCloseForm = () => {
    setUiState((prev) => ({
      ...prev,
      isFormOpen: false,
      editingTransactionId: null,
    }));
  };

  const handleCloseCategoryManager = () => {
    setUiState((prev) => ({
      ...prev,
      isCategoryManagerOpen: false,
    }));
  };

  return (
    <>
      {/* Modal Thêm/Sửa giao dịch */}
      <Modal
        isOpen={uiState.isFormOpen}
        onClose={handleCloseForm}
        title={uiState.editingTransactionId ? 'Sửa giao dịch' : 'Thêm giao dịch mới'}
      >
        <TransactionForm />
      </Modal>

      {/* Modal Quản lý danh mục */}
      <Modal
        isOpen={uiState.isCategoryManagerOpen}
        onClose={handleCloseCategoryManager}
        title="Quản lý danh mục"
      >
        <CategoryManager />
      </Modal>
    </>
  );
};
