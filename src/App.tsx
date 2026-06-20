import { useContext } from 'react';
import './App.css';
import { AppProvider, AppContext } from './context/AppContext';
import { Dashboard } from './components/dashboard/Dashboard';
import { Modal } from './components/ui/Modal';
import { TransactionForm } from './components/transactions/TransactionForm';
import { TransactionList } from './components/transactions/TransactionList';
import { FilterBar } from './components/filters/FilterBar';
import { CategoryManager } from './components/categories/CategoryManager';

function AppContent() {
  const context = useContext(AppContext);
  if (!context) {
    return null;
  }

  const { uiState, setUiState } = context;

  const handleOpenAddForm = () => {
    setUiState((prev) => ({
      ...prev,
      isFormOpen: true,
      editingTransactionId: null,
    }));
  };

  const handleCloseForm = () => {
    setUiState((prev) => ({
      ...prev,
      isFormOpen: false,
      editingTransactionId: null,
    }));
  };

  const handleOpenCategoryManager = () => {
    setUiState((prev) => ({
      ...prev,
      isCategoryManagerOpen: true,
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
      
      <main className="app-main">
        <Dashboard />
        <FilterBar />
        <TransactionList />
      </main>

      <footer className="app-footer">
        <p>Personal Expense Tracker &copy; 2026</p>
      </footer>

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
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
