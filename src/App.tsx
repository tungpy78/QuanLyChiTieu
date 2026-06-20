import { useContext } from 'react';
import './App.css';
import { AppProvider, AppContext } from './context/AppContext';
import { Dashboard } from './components/dashboard/Dashboard';
import { Modal } from './components/ui/Modal';
import { TransactionForm } from './components/transactions/TransactionForm';
import { TransactionList } from './components/transactions/TransactionList';

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

  return (
    <>
      <header className="app-header">
        <div className="header-content">
          <h1>Quản lý chi tiêu cá nhân</h1>
          <p className="subtitle">Theo dõi và quản lý dòng tiền của bạn một cách khoa học</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary btn-add" onClick={handleOpenAddForm}>
            + Thêm giao dịch
          </button>
        </div>
      </header>
      
      <main className="app-main">
        <Dashboard />
        <TransactionList />
      </main>

      <footer className="app-footer">
        <p>Personal Expense Tracker &copy; 2026</p>
      </footer>

      <Modal
        isOpen={uiState.isFormOpen}
        onClose={handleCloseForm}
        title={uiState.editingTransactionId ? 'Sửa giao dịch' : 'Thêm giao dịch mới'}
      >
        <TransactionForm />
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
